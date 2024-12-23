"use client";


import ProductComponent from "@/components/product-component";
import { callAPI } from "@/utils/api-caller";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import Footer from "@/components/footer";
import Shipping from "@/components/shipping";
import Header from "@/components/header";
import styled from 'styled-components';



const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE;


const SearchPage = () => {
   const [products, setProducts] = useState([]);
   const searchParams = useSearchParams();
   const [pageCount, setPageCount] = useState(1);
   const router = useRouter();
   const page = searchParams.get('page') !== null ? +searchParams.get('page') : 1;
   const searchTerm = searchParams.get('q') || '';


   useEffect(() => {
       fetchData();
   }, [searchParams]);


   const fetchData = async () => {
       try {
           const res = await callAPI(`/products?populate=*&filters[name][$contains]=${searchTerm}&pagination[pageSize]=${pageSize}&pagination[page]=${page}`, "GET");
           setProducts(res.data.data);
           setPageCount(res.data.meta.pagination.pageCount);
       } catch (error) {
           console.log(error);
       }
   };


   

   return (
       <div>
           <Header />

           <section id="Projects"
               className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-5 mt-40 mb-10">
               {products.map((value, index) => (
                   <ProductComponent
                       id={value.id}
                       key={index}
                       productName={value.attributes.name}
                       price={value.attributes.price}
                       imageUrl={value.attributes.image.data[0].attributes.url}
                   />
               ))}
           </section>
           

           <Footer />
       </div>
   );
};


export default SearchPage;



