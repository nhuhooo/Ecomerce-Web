
"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";

import { getUser, isLogined } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Bodi from "@/components/bodi";
import Collection from "@/components/collection";



  export default function Home() {
    const router = useRouter()
  useEffect(()=>{
  
    console.log(getUser())
    if (getUser()?.role?.name === "ShopManager")
    {
        router.replace("/shop-manager")
    }
    
}, [])
    return (
     <div className="relative bg-[rgb(251,249,247)]">
      <Header />
      <Bodi/>
      <Collection/>
      <Footer/>
      </div>

);
}

  