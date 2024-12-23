"use client";
import { callAPI } from '@/utils/api-caller.js';
import { setToken, setUser } from '@/utils/helper.js';
import { useRouter } from 'next/navigation'
import '@/components/style.css'

import { useState } from 'react';

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // New state for success message
    const router = useRouter();

    const onRegisterClick = async () => {
        try {
            const data = {
                username: username,
                email: email,
                password: password
            };
            
            const res = await callAPI("/auth/local/register", "POST", data);
            console.log('Registration successful:', res.data);

            setToken(res.data.jwt);
            setUser(res.data.user);
            setSuccessMessage("Yay, you have successfully subscribed!"); // Set success message
            setErrorText(""); // Clear any previous error messages

        } catch (error) {
            console.log(error);
            setErrorText("Registration failed. Please try again.");
            setSuccessMessage(""); // Clear success message on error
        }        
    };

    const goToLogin = () => {
        router.push("/login"); // Navigate to the login page
    };

    return (
        <div className="bg-[rgb(251,249,247)] lg:flex">
            <div className="bg-[rgba(134,111,70,0.2)] w-1/2">
                <img className='imglogin' src="https://skin1004.com/cdn/shop/files/231223_Flagship_Store_26.png?v=1708666115" alt="" />
            </div>
            <div className="mt-8 bg-[rgb(251,249,247)] h-screen lg:w-1/2 lg:mt-0">
                <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white px-20 py-10">Hello, </h1>
                <h2 className="px-20">We’re so happy you’re here. Sign up to get started!</h2>
                
                <form className="w-full lg:max-w-xl container px-6 py-24 mx-auto lg:py-10">
                    <div className="relative flex items-center">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </span>
                        <input id="username" name="username" type="text" value={username} onChange={(e) => { setUsername(e.target.value); setErrorText(""); }} required className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600" placeholder="Username" />
                    </div>
                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>
                        <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrorText(""); }} required className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600" placeholder="Email address" />
                    </div>
                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>
                        <input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={(e) => { setPassword(e.target.value); setErrorText(""); }} required className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600" placeholder="Password" />
                    </div>
                    <div className="mt-8 md:flex md:items-center">
                        <button type="button" onClick={onRegisterClick} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-black capitalize bg-[rgba(134,111,70,0.2)] transition-colors duration-300 transform rounded-lg md:w-1/2 hover:bg-[rgba(134,111,70,0.5)] focus:outline-none">
                            Sign up
                        </button>
                    </div>
                    {successMessage && (
                        <div className="mt-4 text-center">
                            <span className="text-green-600">{successMessage}</span>
                            <div className="mt-2">
                                <button onClick={goToLogin} className="text-blue-500 hover:underline">
                                    Continue Log in
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
