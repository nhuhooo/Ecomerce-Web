"use client";
import React, { useState, useEffect } from 'react';
import { useAppContext } from "@/components/context";
import ShoppingCartItem from "@/components/shopping-cart-item";
import { callAPI } from "@/utils/api-caller";
import Link from "next/link";

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

const ShoppingCartPage = () => {
    const { shoppingCart, setShoppingCart } = useAppContext();
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [orderID, setOrderID] = useState("");
    const [shippingType, setShippingType] = useState("");
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        calcTotalPrice();
    }, [shoppingCart]);

    const calcTotalPrice = () => {
        const sum = shoppingCart.reduce((acc, item) => acc + (+item.price * +item.amount), 0);
        setTotalPrice(sum);
    };

    const handleCheckout = async () => {
        if (!address || !phone || !shippingType) {
            setAlertMessage("All fields must be filled out");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            return;
        }
        try { 
            const now = new Date();
            const orderID = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
            setOrderID(orderID);

            const data = {
                address,
                phone,
                orderID,
                shippingType,
                products: shoppingCart
            };

            const res = await callAPI("/check-out", "POST", data);

            if (!res.data.error) {
                setShoppingCart([]);
                setAlertMessage("Đơn hàng đã thành công");
                setShowSuccess(true);
            } else {
                console.error("Checkout error:", res.data.error);
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    const isCheckoutDisabled = !address || !phone || !shippingType;

    return (
        <div className="h-screen w-screen bg-[rgb(251,249,247)] pt-20">
            <h1 className="mb-10 pt-20 text-center text-2xl font-bold">My Cart</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {
                        shoppingCart.map((val, index) => (
                            <ShoppingCartItem
                                productId={val.id}
                                add={(productId) => callAPI("/add-to-shopping-cart", "POST", { productId, amount: 1 })}
                                decrease={(productId) => callAPI("/add-to-shopping-cart", "POST", { productId, amount: -1 })}
                                remove={(productId, amount) => callAPI("/add-to-shopping-cart", "POST", { productId, amount })}
                                key={index}
                                image={`${URL_SERVER}${val.image[0].url}`}
                                productName={val.name}
                                price={val.price * val.amount}
                                category={val.category.name}
                                amount={val.amount}
                            />
                        ))
                    }
                </div>
                <div className="mt-6 h-full space-y-3 rounded-lg border bg-white p-6 md:mt-0 md:w-1/3">
                    <div>
                        <label htmlFor="address" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Address</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter destination address"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter phone number"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="shippingMethod" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                            Shipping Method
                        </label>
                        <select
                            id="shippingMethod"
                            value={shippingType}
                            onChange={e => setShippingType(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        >
                            <option value="" disabled selected hidden>
                                Choose Shipping Method
                            </option>
                            <option className="bg-gray-50 text-gray-900 text-sm" value="3h">Fast </option>
                            <option className="bg-gray-50 text-gray-900 text-sm" value="5h">Standard </option>
                        </select>
                    </div>

                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div>
                            <p className="mb-1 text-lg font-bold">${totalPrice}</p>
                            <p className="text-sm text-gray-700">including VAT</p>
                        </div>
                    </div>
                    <button
                        id='orderButton'
                        onClick={handleCheckout}
                        className="flex justify-center items-center h-12 w-60 ml-5 my-3 font-semibold border bg-[rgba(134,111,70,0.8)] text-white border-white hover:bg-transparent hover:border-custom-brown hover:text-custom-brown transition duration-300 ease-in-out"
                        disabled={isCheckoutDisabled}
                    >
                        Check out
                    </button>
                </div>
            </div>
            {showAlert && (
                <div className="fixed bottom-[1%] right-[1%] flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Alert:</span> {alertMessage}
                    </div>
                </div>
            )}
           {showSuccess && (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-10 rounded-lg text-center ">
            <h2 className="text-xl font-bold mb-4">You ordered succeed. Your order will be processed as soon as possible</h2>
            <Link href="/products" className="text-blue-500 underline">
            Continue shopping
            </Link>
        </div>
    </div>
)}
        </div>
    );
};

export default ShoppingCartPage;
