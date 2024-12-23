"use client";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductComponent from "@/components/product-component";
import { callAPI } from "@/utils/api-caller";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";

export default function ScrollEffectComponent() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [products, setProducts] = useState([]);
 
 
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    
  }, );

  

 return (
   <div className="relative w-[100vw] h-[100vh] bg-custom-yellow">
     <Header />
     {/* Container lớn */}
     <div className="relative w-full h-screen overflow-hidden">
       {/* Container nhỏ 1 */}
       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " style={{ width: '1440px', height: '814px' }}>
         <img //hình ảnh
           src="/bg01_main.png"
           alt="Background Image"
           className="w-screen h-screen object-cover"
           style={{ transform: `translateY(${scrollPosition * 0.5}px)` }}
         />
         {/* Lớp bóng mờ màu đen */}
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

         {/* Container mới */}
         <div
           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
           style={{ width: "200px", height: "36px", backgroundColor: "rgb(255 255 255 / 0%)" }}
         >
           {/* Nội dung của container mới */}
           <h1 className="text-3xl text-white font-bold -translate-x-1/2 -translate-y-1/2" style={{ transform: `translateY(${scrollPosition * 0.8}px)` }}>
             CENTELLA  
           </h1>

           {/* Container mới */}
           <div
             className="absolute top-[calc(50% + 36px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
             style={{ 
               width: "530px", 
               height: "148,5px", 
               backgroundColor: "rgb(255 255 255 / 0%)",
               marginTop: "80px",
               textAlign: "center" 
             }}
           >
             {/* Nội dung của container mới */}
             <h1 className="text-sm text-white font-bold -translate-x-1/2 -translate-y-1/2" style={{ transform: `translateY(${scrollPosition * 0.8}px)` }}>
               Believing that good skincare products begin from high-quality <br />
               ingredients, SKIN1004 is persistent in using the finest Madagascan <br />
               centella leaves to produce the 'Centella Line.' The Centella line <br />
               products are made of minimal essential ingredients for gentle but <br />
               effective skincare, while excluding unnecessary harmful preservatives <br />
               or chemicals.
             </h1>
           </div>
         </div>
       </div>
     </div>



     <Footer/>
   </div>

   
 );
}
