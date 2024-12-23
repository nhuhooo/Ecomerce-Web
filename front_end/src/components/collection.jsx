"use client";
import Footer from "@/components/footer";
import Shipping from "@/components/shipping";
import ModalAddProduct from "@/components/modal-component";
import ProductComponent from "@/components/product-component";
import { callAPI } from "@/utils/api-caller";
import Image from "next/image";
import { useEffect, useState } from "react";

 
 
const Collection = () => {
          return (
          <div className="container mx-auto flex justify-center items-center">
        
          {/* Container lớn */}
  
          <div className="flex">
            {/* Container nhỏ 1 */}
            
            <div className="w-[480px] h-[600px] bg-white  flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden ">
                
                <img 
                  src="/bg01_main.png" 
                  alt="Skin1004" 
                  className="w-full h-full  object-cover transform transition-transform duration-1000 ease-in-out hover:scale-110 " 
                />
                 <div className="absolute top-0 left-0 w-full h-full bg-black opacity-35"></div>

                
                 {/* Container cho dòng chữ "GENTLE CARE FOR SENSITIVE SKIN" */}
                 <div className="absolute bottom-0 left-0 w-[380px] h-[160.14px] text-white p-4">
                  <div className="text-sm text-white">GENTLE CARE FOR SENSITIVE SKIN</div>
                
                {/* Container cho dòng chữ "CALMING & SOOTHING" */}
                <div className="absolute left-0 w-[380px] h-[160.14px] text-white p-4">
                  <div className="text-xl text-white">CALMING & SOOTHING</div>
  
                <div className="absolute left-0 bottom-0 w-[380px] h-[160.14px] bg-transparent text-white p-4">
                <a href="/collection/centella">
                  <button className="text-white bg-[rgba(255,255,255,0.2)]  py-2 px-4 mt-11 hover:bg-transparent hover:text-white hover:border-white border border-transparent transition duration-500 ease-in-out">CENTELLA</button>
                </a>
                </div>
                </div>
                </div>
              </div>

            </div>
  
            {/* Container nhỏ 2 */}
            <div className="w-[480px] h-[600px] bg-white flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/bg02_main.png" 
                  alt="Skin1004" 
                  className="w-full h-full	object-cover transform transition-transform duration-1000 ease-in-out hover:scale-110" 
                />
               <div className="absolute top-0 left-0 w-full h-full bg-black opacity-35"></div>

             
                 {/* Container cho dòng chữ "GENTLE CARE FOR SENSITIVE SKIN" */}
                 <div className="absolute bottom-0 left-0 w-[380px] h-[160.14px]  text-white p-4">
                  <div className="text-sm text-white">FOR BRIGHT AND HYDRATED SKIN</div>
                
                {/* Container cho dòng chữ "CALMING & SOOTHING" */}
                <div className="absolute left-0 w-[380px] h-[160.14px]  text-white p-4">
                  <div className="text-xl text-white">HYDRATING</div>
                
                <div className="absolute left-0 bottom-0 w-[380px] h-[160.14px] t text-white p-4">
                <a href="/collection/hyalu-cica">
                  <button className="text-white bg-[rgba(255,255,255,0.2)] py-2 px-4 mt-11 hover:bg-transparent hover:text-white hover:border-white border border-transparent transition duration-500 ease-in-out">HYALU-CICA</button>
                </a>
                </div>
                </div>
                </div>
              </div>
            </div>
            
            {/* Container nhỏ 3 */}
            <div className="w-[480px] h-[600px] bg-white flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/bg03_main.webp" 
                  alt="Skin1004" 
                  className="w-full h-full object-cover transform transition-transform duration-1000 ease-in-out hover:scale-110" 
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-35"></div>

        
                 {/* Container cho dòng chữ "GENTLE CARE FOR SENSITIVE SKIN" */}
                 <div className="absolute bottom-0 left-0 w-[380px] h-[160.14px] text-white p-4">
                  <div className="text-sm text-white">FOR OILY, COMBINATION, NORMAL SKIN</div>
                
                {/* Container cho dòng chữ "CALMING & SOOTHING" */}
                <div className="absolute left-0 w-[380px] h-[160.14px] text-white p-4">
                  <div className="text-xl text-white">HEALTHY & YOUTHLY</div>
                
                <div className="absolute left-0 bottom-0 w-[380px] h-[160.14px]  text-white p-4">
                <a href="/collection/poremizing">
                  <button className="text-white bg-[rgba(255,255,255,0.2)] py-2 px-4 mt-11 hover:bg-transparent hover:text-white hover:border-white border border-transparent transition duration-500 ease-in-out">POREMIZING</button>
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Collection;