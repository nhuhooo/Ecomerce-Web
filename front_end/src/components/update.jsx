"use client";


import React, { useState, useEffect } from "react";
import { callAPI } from "@/utils/api-caller";


const UpdateComponent = ({ userId, SetUser, SetisUserUpdated }) => {
   const [realname, setRealname] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [address, setAddress] = useState("");
   const [modal, setModal] = useState(false);


   useEffect(() => {
       const fetchUserDetails = async () => {
           try {
               const { data } = await callAPI(`/users/${userId}`, "GET");
               console.log("Fetched user details:", data); // Debug log
               setRealname(data.realname);
               setPhone(data.phone);
               setEmail(data.email);
               setAddress(data.address);
           } catch (error) {
               console.error("Error fetching user details:", error);
           }
       };


       if (userId) {
           fetchUserDetails();
       }
   }, [userId]);


   const handleUpdate = async (e) => {
       e.preventDefault();
       try {
           const data = {
               realname,
               phone,
               email,
               address
           };


           const res = await callAPI(`/users/${userId}`, 'PUT', data);
           console.log(res.data);


           if (SetUser && SetisUserUpdated) {
               SetUser(prevUser => ({ ...prevUser, ...data }));
               SetisUserUpdated(true);
           }


           setModal(false); // Đóng modal sau khi update thành công


       } catch (error) {
           console.error('Error updating user data:', error);
       }
   };


   const toggleModal = () => {
       setModal(!modal);
   };


   return (
    <div className="px-10 font-serif">
    <button className=" items-center h-12 w-40 ml-5 my-3 font-semibold border border-custom-brown text-custom-brown  hover:bg-[rgba(134,111,70,0.8)] hover:text-white hover:border-white transition duration-300 ease-in-out" onClick={toggleModal}>Edit Information</button>

           {modal && (
               <div className="modal">
                   <div className="modal-content mx-20 p-7 items-center ">
                       <form className="flex grid grid-flow-col auto-cols-max text-xl space-y-3" onSubmit={handleUpdate}>
                       <div className="flex grid grid-flow-row auto-rows-max space-y-3 mt-3 mr-3 "> 
                       <label htmlFor="realname">Name:</label>
                       <label htmlFor="phone">Phone:</label>
                       <label htmlFor="email">Email:</label>
                       <label htmlFor="address">Address:</label>
                        </div>
                        <div className="flex grid grid-flow-row auto-rows-max space-y-3 ">
                        <input
                               type="text"
                               id="realname"
                               value={realname}
                               onChange={(e) => setRealname(e.target.value)}
                               className=" border border-custom-brown "
                           />
                           <input
                               type="number"
                               id="phone"
                               value={phone}
                               onChange={(e) => setPhone(e.target.value)}
                               className=" border border-custom-brown "
                           />
                           <input
                               type="email"
                               id="email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               className=" border border-custom-brown "
                           />
                           <input
                               type="text"
                               id="address"
                               value={address}
                               onChange={(e) => setAddress(e.target.value)}
                               className=" border border-custom-brown "
                           />
                           
                            </div>
                   <button className=" mx-10 items-center h-8 w-30 px-5 my-3 font-semibold border border-custom-brown text-custom-brown  hover:bg-[rgba(134,111,70,0.8)] hover:text-white hover:border-white transition duration-300 ease-in-out" type="submit">Update</button>
                    <button className=" items-center h-8 w-30 px-5 my-3 font-semibold border border-custom-brown text-custom-brown  hover:bg-[rgba(134,111,70,0.8)] hover:text-white hover:border-white transition duration-300 ease-in-out" type="button"  onClick={toggleModal}>Cancel</button>
                          
                       </form>
                   </div>
                   

               </div>
           )}
       </div>
   );
};


export default UpdateComponent;