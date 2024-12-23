"use client";
import { callAPI } from '@/utils/api-caller';
import { isLogined, setToken, setUser } from '@/utils/helper';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import '@/components/style.css'
const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")
    const router = useRouter()
    const onLoginClick = async() => {
        console.log("email vua nhap: " + email)
        console.log("password vua nhap: " + password)
        try {
            const data = {
                identifier: email,
                password
            }
            const res = await callAPI("/auth/local", "POST", data)
            console.log(res.data)
            setToken(res.data.jwt)
            const userRes = await callAPI("/users/me?populate=role", "GET")
            setUser(userRes.data)
            console.log(res.data.jwt)
            router.replace("/")
        } catch (error) {
            setErrorText("Sai tài khoản hoặc mật khẩu!")
            console.log(error)
        }  
    }
    useEffect(()=>{
        if (isLogined())
        {
            router.replace("/")
        }
        
    },[])
    return(
    <div>
        <div class=" bg-[rgb(251,249,247)] flex">
            <div class=" bg-[rgba(134,111,70,0.2)] w-1/2">
            <img className='imglogin' src="https://skin1004.com/cdn/shop/files/231223_Flagship_Store_26.png?v=1708666115" alt="" />
            </div>
            <div class="mt-8 w-1/2 h-screen lg:mt-0">
            <h1 class="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white px-20 py-10" >Hello, </h1> 
            <h2 class="px-20">We've missed your smile. Log in to continue</h2>
           
                <form class=" w-full lg:max-w-xl container px-6 py-24 mx-auto lg:py-10">
                    <div class="relative flex items-center">
                        <span class="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>

                        <input id="email" name="email" type="email" autocomplete="email" value={email} onChange={(e)=>{setEmail(e.target.value); setErrorText("")}} required class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 " placeholder="Email address"/>
                    </div>

                    <div class="relative flex items-center mt-4">
                        <span class="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <input id="password" name="password" type="password" autocomplete="current-password" value={password} onChange={(e)=>{setPassword(e.target.value);  setErrorText("")}} required class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 " placeholder="Password"/>
                    </div>

                    <div class="mt-8 md:flex md:items-center">
                        <button onClick={()=>onLoginClick()} class="w-full px-6 py-3 text-sm font-medium tracking-wide text-black capitalize bg-[rgba(134,111,70,0.2)] transition-colors duration-300 transform  rounded-lg md:w-1/2 hover:bg-[rgba(134,111,70,0.5)] focus:outline-none">
                            Sign in
                        </button>

                        <a href="#" class="inline-block mt-4 text-center text-black md:mt-0 md:mx-6 hover:underline dark:text-black">
                            Forgot your password?
                        </a>
                        
                    </div>
                    <div class="mt-6">
                <p class="mt-4 text-center text-gray-600 dark:text-gray-400">or</p>

                <a href="#" class="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg  dark:text-gray-200 hover:bg-[rgba(134,111,70,0.2)] dark:hover:bg-gray-600 ">
                    <svg class="w-5 h-5 sm:h-6 sm:w-6" viewBox="0 0 38 38">
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                    </svg>
                    <span class="mx-2">Sign in with Google</span>
                </a>
                <a href="#" class="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-[rgba(134,111,70,0.2)] dark:hover:bg-gray-600">
                    <svg class="w-5 h-5 sm:h-6 sm:w-6"viewBox="0 0 24 24">
                       <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="#1877F2"/>
                    </svg>
                    <span class="mx-2">Sign in with Facebook</span>
                </a>
            
                <div class="mt-6 text-center py-7 ">
                    <a href="/sign-up" class="text-sm text-black hover:underline dark:text-rose-400">
                        Don’t have an account yet? Sign up
                    </a>
                </div>
            </div>
                </form>
            </div>
        </div>
        
    </div>
    )
    
}
export default LoginPage;