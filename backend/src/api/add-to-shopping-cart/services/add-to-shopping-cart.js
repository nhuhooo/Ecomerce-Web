'use strict';

/**
 * add-to-shopping-cart service
 */

module.exports = () => ({
    addNew: async (user, productId, amount) => {
        console.log(productId);
        
        // Initialize shopping cart as an empty array if it is null or undefined
        const shoppingCart = user.shoppingcart || [];
        let exist = false;

        for (let i = 0; i < shoppingCart.length; i++) {
            if (+shoppingCart[i].productId === +productId) {
                exist = true;
                const newAmount = +shoppingCart[i].amount + amount;
                
                if (newAmount <= 0) {
                    shoppingCart.splice(i, 1);
                } else {
                    shoppingCart[i].amount = newAmount;
                }
                break;
            }
        }

        if (!exist) {
            shoppingCart.push({
                productId,
                amount
            });
        }

        // Update the user's shopping cart
        const entry = await strapi.entityService.update('plugin::users-permissions.user', user.id, {
            data: {
                shoppingcart: shoppingCart,
            },
        });

        // Populate additional product details in the shopping cart
        for (let i = 0; i < shoppingCart.length; i++) {
            const itemAmount = shoppingCart[i].amount;
            shoppingCart[i] = await strapi.entityService.findOne('api::product.product', shoppingCart[i].productId, {
                populate: { category: true, image: true },
            });
            shoppingCart[i].amount = itemAmount;
        }

        return shoppingCart;
    },
});
