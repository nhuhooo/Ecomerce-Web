"use client";
import React, { useEffect,useState } from 'react';
import Slideshow from '../components/slideshow';
import '@/components/style.css';
import New from "@/components/new";
import { callAPI } from "@/utils/api-caller";
import styled from 'styled-components';
import Slide from '@/components/slide.jsx'



const bannerImages = [
    'img1.jpeg',
    'img3.jpeg',
    'img4.jpeg',
    ]
const bannerImages1 = [
        'https://skin1004korea.com/web/upload/210705/collection03/220801_collection03_img04.png',
        'https://skin1004korea.com/web/upload/210705/collection/220809_collection_img04.png',
        'https://skin1004korea.com/web/upload/210705/collection02/220809_collection02_img01.png',
        ]

const Bodi = () => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])


    useEffect(() => {
      getNewProducts();
      getBestSeller();
     
    }, []);
  
    const getNewProducts = async () => {
  
      try {
        const res = await callAPI(`/products/?populate=*&?sort[0]=createdAt:desc&pagination[limit]=4`, "GET");
        console.log(res)
        setProducts(res.data.data)
          } catch (error) {
              console.log(error)
          }
          
    }
    const getBestSeller = async () => {
  
        try {
          const res = await callAPI(`/products?populate[0]=image&sort=in_stock:asc&pagination[limit]=5`, "GET");
          console.log(res)
          setProduct(res.data.data)
            } catch (error) {
                console.log(error)
            }
            
      }
   
    const ScrollableContainer = styled.div`
        height: 680px; /* Chiều cao cố định của container */
        overflow-y: scroll; /* Tạo thanh cuộn dọc */
        display: flex;
        flex-direction: column;
     /* Hiển thị các phần tử theo chiều dọc */
        justify-content: center; /* Canh giữa các phần tử theo trục dọc */
        align-items: flex-end; /* Đặt các phần tử ở bên phải */
    `;

          return (
              <bodi>
                  <div>
                      <video
                           autoPlay  controls  loop   >
                          <source src='/video.mp4' type='video/mp4' />
                      </video>
                      <div className="flex ">
                          <div className='w-1/2  h-[650px]' >
                              <Slideshow images={bannerImages} />
                          </div>
                          <div className='w-1/2 '>
                          <br />
                              <span  className="text-3xl text-custom-brown px-10 mt-10">New</span>

                              <div  className="w-70 ">
                                  <ScrollableContainer style={{ display: "inline-block" }}>


                                      {products.map((value, index) => (
                                          <New
                                              id={value.id}
                                              key={index}
                                              productName={value.attributes.name}
                                              imageUrl={value.attributes.image.data[0].attributes.url}


                                          />
                                      ))}
                                  </ScrollableContainer>    
                                     </div>
                          </div>
                      </div>
                      <div className="flex">
                          
                          <div className='w-1/2'>
                              <button className="text-3xl text-custom-brown mt-10 px-10 ">Best Seller</button>

                              <div  className=" px-10  w-70 ">
                                  <ScrollableContainer style={{ display: "inline-block" }}>


                                      {product.map((value, index) => (
                                          <New
                                              id={value.id}
                                              key={index}
                                              productName={value.attributes.name}
                                              imageUrl={value.attributes.image.data[0].attributes.url}


                                          />
                                      ))}
                                  </ScrollableContainer>

                              </div>
                              
                          </div>
                          <div className='w-1/2' >
                              <Slide images={bannerImages1} />
                          </div>
                      </div>
                  </div>
              </bodi>
          );
}
export default Bodi;