"use client"
import { callAPI } from "@/utils/api-caller";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "@/components/context";
import '@/components/style.css'
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA
const ViewDetailProduct = ()=>{
    const {setShoppingCart} = useAppContext()
    const [showAlert, setShowAlert] = useState(false)

  
    const params = useParams()
    const [product, setProduct] = useState(null)
    useEffect(()=>{
        getDetailProduct()
    },[])
    const getDetailProduct = async()=>{
        try {
            const res = await callAPI("/products/" + params.id + "?populate=*", "GET")
            console.log(res)
            setProduct(res.data.data)
        } catch (error) {
            console.log(error)
        }
        
    }
    const addToCart = async(productId)=>{
        try {
            const res = await callAPI("/add-to-shopping-cart", "POST", {productId, amount: 1})
            console.log(res)
            setShoppingCart(res.data)
            setShowAlert(true)
            setTimeout(()=>{ setShowAlert(false)}, 2000)
        } catch (error) {
            
        }
      }
     
     
     const [currentImageIndex, setCurrentImageIndex] = useState(0);
     const handleThumbnailClick = (index) => {
         // Lấy id của hình ảnh lớn tương ứng
         const imageId = `productImage${index}`;
     
         // Cuộn đến vị trí của hình ảnh lớn tương ứng
         document.getElementById(imageId).scrollIntoView({
             behavior: "smooth",
             block: "start",
           });
         }
    
    return (
        product !== null?
        <div className='pt-40 bg-[rgb(251,249,247)]'>
        <div className="grid bg-[rgb(251,249,247)]">
        <div className="flex  mb-10">
            {/* Container hình ảnh thu nhỏ */}
            <div className="w-30  ml-20 mr-10">
            {product.attributes.image.data.map((image, index) => (
              <img
                src={URL_SERVER + image.attributes.url}
                alt={`Thumbnail Image ${index + 1}`}
                key={index}
                className="h-20 w-30 object-cover mb-5"
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
            </div>
            {/* Container A ở chính giữa */}
            <div className="w-1/2 items-center mr-10">
                      {/* Hiển thị hình ảnh lớn của sản phẩm */}
                      {product.attributes.image.data.map((image, index) => (
                        <div id={`productImage${index}`} key={index} >
                            <img
                                src={URL_SERVER + image.attributes.url}
                                alt={`Product Image ${index + 1}`}
                                className=" object-cover mb-10"
                            />
                        </div>
            ))}
            </div>
            {/* Container B nằm bên phải */}
            <div className="w-1/3 mr-20 ">
                {/*Name, price , quantity of product from strapi*/}
              <div className=" items-center px-5 py-5">
              <div className="mt-30 text-gray-400 mr-3 uppercase text-xs">{product.attributes.category.data.attributes.name}</div>
                <p className="text-lg font-bold text-black truncate block capitalize">{product.attributes.name}</p>
                <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">${product.attributes.price}</p>
                </div>
             </div>

              
               {/* Nút thêm vào giỏ hàng */}
               <div className=" flex justify-center items-center h-12 w-96 ml-5 my-3 font-semibold border border-custom-brown text-custom-brown  hover:bg-[rgba(134,111,70,0.8)] hover:text-white hover:border-white transition duration-300 ease-in-out">
               <button onClick={()=>addToCart(params.id)} type="button" >ADD TO CART</button>
                </div>
                <div className="px-5 py-10">
                      <div className="text-xl font-semibold text-black cursor-auto">WHAT IT IS: </div>
                      <div className="text-lg pt-5 font-semi text-black cursor-auto">{product.attributes.description}</div>
                      <div className="text-xl pt-8 font-semibold text-black cursor-auto">KEY INGREDIENTS:</div>
                      <div className="text-lg pt-5 font-semi text-black cursor-auto">{product.attributes.key}</div>


                  </div>

        
            </div>
            </div>
            </div>
            </div>




        :
            <div>Sản phẩm không tìm thấy</div>
    )
}
export default ViewDetailProduct;