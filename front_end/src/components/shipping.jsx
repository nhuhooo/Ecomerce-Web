"use client";
import { callAPI } from "@/utils/api-caller";
import Link from "next/link";
import { useEffect, useState } from "react";

const Shipping = () => {

   
    
    return (
        <div className="w-full bg-white h-10 py-2  justify-center">
             <marquee scrollamount="15">
                         <span className="ml-20 mr-20">FREE SHIPPING NOW AVAILABLE ✈️</span>
                         <span className="ml-20 mr-20">FREE SHIPPING NOW AVAILABLE ✈️</span>
                         <span className="ml-20 mr-20">FREE SHIPPING NOW AVAILABLE ✈️</span>
                         <span className="ml-20">FREE SHIPPING NOW AVAILABLE ✈️</span>
            </marquee>
        </div>
    )
}
export default Shipping;