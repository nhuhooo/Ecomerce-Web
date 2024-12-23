"use client"
import ProductComponent from "@/components/product-component";
import { callAPI } from "@/utils/api-caller";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE

const ProductsPage = () => {
    const [products, setProducts] = useState([])
    const searchParams = useSearchParams()
    const [pageCount, setPageCount] = useState(1)
    const router = useRouter();
    const page = searchParams.get('page') !== null ? +searchParams.get('page') : 1
    
    useEffect(() => {
        fetchData();
    }, [searchParams])
    const fetchData = async () => {
        try {
            const res = await callAPI(`/products?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`, "GET")
            setProducts(res.data.data)
            setPageCount(res.data.meta.pagination.pageCount)
        } catch (error) {
            console.log(error)
        }
    }
    const prev = ()=>{
        router.push("/products?page=" + ((+page) - 1))
    }
    const next = ()=>{
        router.push("/products?page=" + ((+page) + 1))
    }
    return (
        <div className='bg-[rgb(251,249,247)] pt-40  items-center'>
            <div className=" text-2xl text-black font-semibold text-center">ALL PRODUCTS</div>
        <div >
            <section id="Projects"
                className=" pt-40 w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3  gap-y-20 gap-x-5 mb-10">
                {
                    products.map((value, index) => {
                        return <ProductComponent
                            id={value.id}
                            key={index} productName={value.attributes.name}
                            price={value.attributes.price}
                            imageUrl={value.attributes.image.data[0].attributes.url}
                            imageUrl2={value.attributes.image.data[1].attributes.url} />
                    })
                }
            </section>
            <div className="flex flex-col items-center pb-20">

                <div className="inline-flex mt-2 xs:mt-0">
                    <button disabled={+page <= 1} onClick={() => prev()} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white  rounded-s hover:-900 dark: dark:border-white dark:text-black dark:hover:bg-gray-200 dark:hover:text-black">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                        </svg>


                    </button>
                    <span className="ml-5 mr-5 font-bold">Page {page} of {pageCount}</span>
                    <button disabled={+page >= +pageCount} onClick={() => next()} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white  rounded-s hover:-900 dark: dark:border-white dark:text-black dark:hover:bg-gray-200 dark:hover:text-black">

                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                        </svg>

                    </button>
                </div>
            </div>
        </div>
        </div>
    )
}
export default ProductsPage;