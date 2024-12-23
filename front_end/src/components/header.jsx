"use client";
import { callAPI } from "@/utils/api-caller";
import { getUser, isLogined, setToken, setUser } from "@/utils/helper";

import styled from 'styled-components';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "@/components/context";
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA

const Header = () => {
    const [categories, setCategories] = useState([])
    const [userMenu, setUserMenu] = useState(false);


    const [user, setUserState] = useState(getUser())
    const router = useRouter()
    const [skins, setSkins] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const searchRef = useRef(null);
    const resultsRef = useRef(null);


    useEffect(() => {
        fetchData()
        if (isLogined())
            fetchShoppingCart();
        document.body.addEventListener("click", handleClickOutside);
        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };




    }, [])
    const fetchData = async () => {

        try {
            const res = await callAPI("/categories", "GET")
            setCategories(res.data.data)

            console.log(res.data.data)

            const skinres = await callAPI("/skins", "GET");
            setSkins(skinres.data.data);
            console.log(skinres.data.data);


            const productsRes = await callAPI(`/products?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`, "GET");
            setProducts(productsRes.data.data);
            setPageCount(productsRes.data.meta.pagination.pageCount);
        } catch (error) {
            console.log(error)
        }
    }
    const { setShoppingCart, isFetchedShoppingCart, setIsFetchedShoppingCart } = useAppContext()
    const fetchShoppingCart = async () => {
        if (!isFetchedShoppingCart) {
            try {
                const res = await callAPI("/my-shopping-cart", "GET")
                console.log(res)
                setShoppingCart(res.data)
                setIsFetchedShoppingCart(true)
            } catch (error) {
                console.log(error)
            }
        }

    }

    const logout = () => {
        setToken("")
        setUser(null)
        setUserState(null)
        router.replace("/")
    }
    const { shoppingCart } = useAppContext()

    const showDropdown = () => {
        setIsDropdownVisible(true);
    };


    const hideDropdown = () => {
        setIsDropdownVisible(false);
    };
    const handleClickOutside = (event) => {
        if (
            searchRef.current &&
            !searchRef.current.contains(event.target) &&
            resultsRef.current &&
            !resultsRef.current.contains(event.target)
        ) {
            setIsSearching(false);
            setSearchResults([]);
        }
    };


    const handleSearchButtonClick = () => {
        setIsSearching(true);
    };


    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await callAPI(
                `/products?populate=*&filters[name][$contains]=${searchTerm}`,
                "GET"
            );
            setSearchResults(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };


    const handleTurnOffSearch = () => {
        setIsSearching(false);

    };
    const ScrollableContainer = styled.div`
    height: 645px; /* Chiều cao cố định của container */
    overflow-y: scroll; /* Tạo thanh cuộn dọc */
    display: flex;
    flex-direction: coluư
    mn; /* Hiển thị các phần tử theo chiều dọc */
    justify-content: center; /* Canh giữa các phần tử theo trục dọc */
    align-items: flex-end; /* Đặt các phần tử ở bên phải */
`;


    return (
        <header className="fixed z-30 bg-[rgb(134,111,70)] w-full h-38">
            <div className="w-full bg-white h-10 py-2 justify-center">
                <marquee scrollamount="6">
                    <span className="ml-20 mr-20 font-serif">FREE SHIPPING NOW AVAILABLE ✈️</span>
                </marquee>
            </div>
            <div className="flex items-center justify-between px-4 py-4 mx-20">
                <div className="flex items-center space-x-8">
                    <Link href="/brand" className="text-white font-medium">Brand</Link>
                    <Link href="/experience" className="text-white font-medium">Experience</Link>
                    <div className="relative" onMouseEnter={() => setIsDropdownVisible(true)} onMouseLeave={() => setIsDropdownVisible(false)}>
                        <Link href="/products" className="text-white font-medium">Shop</Link>
                        {isDropdownVisible && (
                            <div className="absolute z-10 left-0 mt-0 bg-white p-4 flex space-x-10">
                                <div className="flex-1">
                                    <span className="font-bold">Product Type</span>
                                    {categories.map((val, index) => (
                                        <Link key={index} href={`/category/${val.id}`} className="block px-4 py-2 hover:bg-gray-50">{val.attributes.name}</Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <Link href="/" className="flex justify-center items-center mx-auto">
                    <img src="logo.png" className="h-10" alt="Logo"/>
                </Link>

                <div className="flex items-center space-x-8">
                    {!user ? (
                        <Link href="/login" className="text-white font-medium">Log in</Link>
                    ) : (
                        <div className="relative text-white font-medium">
                            <button onClick={() => setUserMenu(!userMenu)}>{user.username}</button>
                            {userMenu && (
                                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                    <ul className="py-2 text-sm text-gray-700">
                                        <li><Link href="/my-profile" className="block px-4 py-2">Information</Link></li>
                                        <li><Link href="/my-orders" className="block px-4 py-2">My Orders</Link></li>
                                        <li><button onClick={logout} className="block w-full text-start px-4 py-2">Log out</button></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                    {user && (
                        <Link href="/shopping-cart" className="relative">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-7">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            <span className="bg-white text-black font-bold rounded-full text-xs px-1 absolute top-0 right-[-1em]">{shoppingCart.length}</span>
                        </Link>
                    )}
                    <button onClick={handleSearchButtonClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                    </button>
                    {isSearching && (
                            
                            
                            <div className="fixed top-20 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center">
                                <div
                                    ref={searchRef}
                                    className="bg-white py-2 px-2 w-full mx-4 w-full h-[50px]"
                                    style={{ marginTop: "-600px" }}
                                >
                                    <div className="flex justify-between items-center">
                                        <form onSubmit={handleSearchSubmit} className="flex items-center">
                                            <button
                                                type="submit"
                                                style={{
                                                    backgroundSize: "contain",
                                                    backgroundRepeat: "no-repeat",
                                                    width: "30px",
                                                    height: "30px",
                                                    border: "none",
                                                    padding: 0,
                                                    marginRight: "10px",
                                                    cursor: "pointer",
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="SEARCH..."
                                                style={{
                                                    padding: "5px 10px",
                                                    position: "relative",
                                                    width: "1270px",
                                                    top: "-0.5px",
                                                }}
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            <button
                                            onClick={handleTurnOffSearch}
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>

                                        </button>
                                        </form>
                                        
                                        {searchTerm.length > 0 && (
                                        <div
                                            ref={resultsRef}
                                            className="fixed top-0 left-0 w-full  flex justify-center items-center mt-60"
                                        >
                                            <div className=" p-8 rounded-md w-full mx-4 -mt-10">
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                    {searchResults.map((product) => (
                                                        <div
                                                            onClick={handleTurnOffSearch}
                                                            key={product.id}
                                                            className="border bg-white p-4 rounded-md flex flex-col items-center"
                                                        >
                                                            <Link

                                                                href={`/products/${product.id}`}
                                                                className="flex flex-col items-center"
                                                            >
                                                                <img
                                                                    src={URL_SERVER + product.attributes.image.data[0].attributes.url}
                                                                    className="w-32 h-32 object-cover mb-2"
                                                                />
                                                                <div className="font-bold">{product.attributes.name}</div>
                                                                <div className="text-gray-500">${product.attributes.price}</div>
                                                            </Link>

                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    </div>
                                    


                                </div>
                            </div>
                        )}

                    
                </div>
            </div>
        </header>
    );
};

export default Header;