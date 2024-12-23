// @ts-nocheck
'use strict';

const fetch = require('node-fetch');

// Calculate the total price and update stock
const getTotalPrice = async (products) => {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
        const amount = products[i].amount;
        const entry = await strapi.entityService.findOne('api::product.product', +products[i].productId);
        
        if (!entry) {
            throw new Error(`Error: Product with ID ${products[i].productId} not found.`);
        }

        const price = entry.price;
        sum += price * amount;

        if (entry.in_stock - amount < 0) {
            throw new Error("Error: Insufficient stock for product " + entry.name);
        }

        await strapi.entityService.update('api::product.product', +products[i].productId, {
            data: {
                in_stock: entry.in_stock - amount,
            }
        });
    }
    return sum;
};

// Fetch distance using external Distance Matrix API
const getDistanceFromAPI = async (address) => {
    const apiKey = 'F0Mb0daNsNBbYUl5kkDMJNbPdE5N3ZkVSFp8o2kvlazr9CeLkJXj5oR9RdPmbVKc';
    const apiUrl = 'https://api.distancematrix.ai/maps/api/distancematrix/json';
    const origins = '365 Le Van Sy Quan 3';
    const requestUrl = `${apiUrl}?origins=${origins}&destinations=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await fetch(requestUrl);
        const data = await response.json();

        if (response.ok) {
            const result = data.rows[0].elements[0];
            if (result.status === "OK") {
                return result.distance.text; // Returns distance as text
            } else {
                throw new Error('API result error');
            }
        } else {
            throw new Error(data.error_message || 'API call failed');
        }
    } catch (error) {
        console.error('Distance API Error:', error.message);
        throw error;
    }
};

// Predict estimated delivery time
const predict = async (createdAt, distance, serviceType) => {
    const apiUrl = 'http://127.0.0.1:3000/'; // Flask app URL for prediction
    const payload = {
        createdAt, // Pass the created timestamp
        shippingDistance: parseFloat(distance.replace(" km", "")) * 1000, // Convert distance to meters
        serviceType
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await response.json();

        if (response.ok) {
            return data.prediction;
        } else {
            throw new Error(data.error || 'Prediction API error');
        }
    } catch (error) {
        console.error('Prediction API Error:', error.message);
        throw error;
    }
};

// Checkout function to handle order processing
module.exports = () => ({
    checkout: async (user, body) => {
        try {
            if (user.shoppingcart.length <= 0) {
                throw new Error("Error: Empty shopping cart");
            }

            const { address, phone, orderID, shippingType } = body;

            const totalPrice = await getTotalPrice(user.shoppingcart);
            
            const distance = await getDistanceFromAPI(address);

            const publishedAt = new Date().toISOString();

            const estimatedDeliveryTime = await predict(publishedAt, distance, shippingType);

            const orderData = {
                user: user.id,
                products: user.shoppingcart,
                totalPrice,
                address,
                phone,
                orderID,
                distance,
                shippingType,
                estimatedDeliveryTime, // Include the prediction result
                publishedAt: new Date(),
            };

            await strapi.entityService.create('api::order.order', {
                data: orderData,
            });

            await strapi.entityService.update('plugin::users-permissions.user', user.id, {
                data: {
                    shoppingcart: [],
                },
            });

            return { message: "Order created successfully", orderData };
        } catch (error) {
            console.error("Checkout Error:", error.message);
            return { error: error.message };
        }
    }
});
