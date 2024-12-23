"use client";
import { useEffect, useState , useRef } from "react";
import Link from "next/link";

import '@/components/style.css'



const ExperiencePage = () => {

  
  useEffect(() => {

  }, []);

  const videoRef = useRef(null);
  const imageList = [
    'https://skin1004.com/cdn/shop/files/231223_Flagship_Store_3.jpg?v=1708593708',
    'https://skin1004.com/cdn/shop/files/231223_Flagship_Store_5_1.png?v=1708593861',
    'https://skin1004.com/cdn/shop/files/231223_Flagship_Store_7.jpg?v=1708593708',
    'https://skin1004.com/cdn/shop/files/231223_Flagship_Store_11.jpg?v=1708593709',
    'https://skin1004.com/cdn/shop/files/231223_Flagship_Store_14.jpg?v=1708593709',
    'https://skin1004.com/cdn/shop/files/231223_Flagship_Store_25.png?v=1708666115',
  ];
  

            return (
              <div className="flex-container pb-20 ">
                <div className="flex ">
                  <video  id="myVideo" ref={videoRef} src="https://cdn.shopify.com/videos/c/vp/47bd14bb3ca84f0cb63f5bddbe94ae6c/47bd14bb3ca84f0cb63f5bddbe94ae6c.HD-720p-4.5Mbps-24915311.mp4#t=0.5" autoplay="autoplay" controls="false">
                    <source src="https://cdn.shopify.com/videos/c/vp/47bd14bb3ca84f0cb63f5bddbe94ae6c/47bd14bb3ca84f0cb63f5bddbe94ae6c.HD-720p-4.5Mbps-24915311.mp4#t=0.5" type="video/mp4"></source>
                  </video>
                </div>
                {/*Kiến trúc*/}
                <div className="flex-container w-[1440px] h-[1000px] bg-custom-beige-2" >
                  <div className="flex-items pt-20 ">
                    <h1 className="text-2xl text-custom-brown font-semibold text-center" >
                      DELIVERING YOU THE UNTOUCHED NATURE
                    </h1>
                    <h1 className="text-l text-custom-brown font-semi text-center py-10" >
                      Living in an endlessly busy city, there are times when you forget <br />
                      the silence and tranquility of nature. Give your mind <br />
                      a moment of peace from your restless daily life, and fill your heart <br />
                      With the tranquility and peacefulness that Mother Nature provides. <br />
                    </h1>
                  </div>
                  <div className="flex justify-center" >
                    <img src="https://skin1004.com/cdn/shop/files/LMTLS_SKIN1004_AXON_RENDER_REV_LV02.png?v=1707913360" width="780"></img>
                  </div>

                </div>
                <div className="w-[1440px] h-[800px] bg-custom-yellow relative">
       <h1 className="text-2xl text-white font-semibold text-center pt-20">
         Take a skin type test
       </h1>
       <br/>
       <h1 className="text-xl text-white font-semi text-center">
         To find the best products for your skin
       </h1>
       <div className="flex justify-center pt-20 relative">
         
                   <img src="https://skin1004.com/cdn/shop/files/KakaoTalk_Photo_2024-02-28-14-49-12.jpg?v=1709099660" alt="skin-test" width="780" />

       </div>
     </div>

                <div className="pt-20 ">
                  
                    <h1 className="text-2xl text-custom-brown font-semibold text-center">
                      GALLERY
                    </h1>

                  <div className="scroll-container grid grid-flow-col auto-cols-max mx-20 my-20 space-x-2" >

                      <img src={imageList[0]}  width="450" />
                      <img src={imageList[1]}  width="450" />
                      <img src={imageList[2]}  width="450" />
                      <img src={imageList[3]}  width="450" />
                      <img src={imageList[4]}  width="450" />
                      <img src={imageList[5]}  width="450" />

                    </div>

                  </div>
                  

                </div>
                        
  );
};

export default ExperiencePage;