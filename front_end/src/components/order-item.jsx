import { useState, useEffect } from "react";
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

const OrderItem = ({orderID, products, totalPrice, estimatedDeliveryTime, createdAt }) => {
   
    const [estimatedTime, setEstimatedTime] = useState('');
    const [formattedCreatedAt, setFormattedCreatedAt] = useState('');
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');

   
       


    useEffect(() => {
        // Format createdAt date
        const formattedDate = new Date(createdAt).toLocaleString();
        setFormattedCreatedAt(formattedDate);

        // Calculate estimated delivery time in hours and minutes
        const hours = Math.floor(estimatedDeliveryTime * 24);
        const minutes = Math.round((estimatedDeliveryTime * 24 - hours) * 60);
        setEstimatedTime(`${hours} hours ${minutes} minutes`);

        // Calculate estimated delivery date by adding estimatedDeliveryTime to createdAt
        const deliveryDate = new Date(new Date(createdAt).getTime() + estimatedDeliveryTime * 24 * 60 * 60 * 1000);
        const formattedDeliveryDate = deliveryDate.toLocaleString();
        setEstimatedDeliveryDate(formattedDeliveryDate);
    }, [createdAt, estimatedDeliveryTime]);

    return (
        <div className="relative  mb-6 p-10 bg-white border border-custom-brown rounded-lg">
            <div className="flex flex-col justify-between">
                <div className="text-lg font-semibold">#{orderID}</div>
                <div className="mb-2">
                    <span className="block">Created at: {formattedCreatedAt}</span>
                    <span className="block">Expected Delivery Date: {estimatedDeliveryDate}</span>
                </div>

                <div className="mt-4 space-y-2">
                    {products.map((product, index) => (
                        <div key={index + product.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <img
                                    src={`${URL_SERVER}${product.image[0].url}`}
                                    alt={product.name}
                                    className="h-[6em] w-auto"
                                />
                                <h2 className="text-lg text-gray-900">
                                    {product.name} <br />
                                    {product.amount} x ${product.price}
                                </h2>
                            </div>
                            <span className="ml-6 text-lg font-semibold">${(product.price * product.amount).toFixed(2)}</span>
                        </div>
                    ))}
                </div>


                <div className="absolute bottom-6 right-6 text-lg font-semibold">
                    Total: ${totalPrice}
                </div>            </div>


        </div>
    );
};

export default OrderItem;
