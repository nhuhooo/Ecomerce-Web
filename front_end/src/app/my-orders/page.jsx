"use client";

import OrderItem from "@/components/order-item";
import ShoppingCartItem from "@/components/shopping-cart-item";
import { callAPI } from "@/utils/api-caller";
import { useEffect, useState } from "react";

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA
const MyOrders = ()=>{
    const [orders, setOrders] = useState([])
    useEffect(()=>{fetchData()},[])
    const fetchData = async()=>{
        try {
            const res = await callAPI("/my-orders", "GET")
            console.log(res.data)
            setOrders(res.data)
        } catch (error) {
            console.log(error)
        }}
        
 
    return (
        <div className="h-screen w-screen bg-[rgb(251,249,247)] pt-20">
            <h1 className="pt-20 mb-10 text-center text-2xl font-bold">My Orders</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg  ">
                    {
                        orders.map((val, index) => {
                            return (
                                <OrderItem
                                    products={val.products}
                                    totalPrice={val.totalPrice}
                                    orderID={val.orderID}
                                    estimatedDeliveryTime={val.estimatedDeliveryTime}
                                    createdAt={val.createdAt}
                                    key={index}
                                   
                                />
                            )
                        })
                    }


                </div>
                
            </div>
        </div>
    )
}
export default MyOrders