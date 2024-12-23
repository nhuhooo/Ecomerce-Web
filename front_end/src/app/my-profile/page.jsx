"use client"
import { useRouter } from 'next/navigation'
import { callAPI } from "@/utils/api-caller";
import React,{ useEffect, useState } from "react";
import UpdateComponent from "@/components/update";



const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA
const ProfilePage = ()=>{
   const [user, SetUser] = useState({});
   const [isUserUpdated, SetisUserUpdated] = useState(false);


    useEffect(() => {
       const fetchData = async () => {
           try {
               const { data } = await callAPI('/users/me', "GET");
               console.log("Fetched user data:", data);
               SetUser(data);
               SetisUserUpdated(false);
           } catch (error) {
               console.log({error});
           }
       };
       fetchData();
   },[isUserUpdated]);
  


   return (
    <div className="px-20 py-40">
         <h1 className="ml-20 mb-10 text-4xl font-semibold font-serif">My Account</h1>
        <div className="body">
            <div className="mx-20 block p-7 text-left items-center font-serif text-xl ">
                <p>Name: {user.realname}</p>
                <p>Phone: {user.phone}</p>
                <p>Email: {user.email}</p>
                <p>Address: {user.address}</p>
            </div>
            {user.id ? (
                    <UpdateComponent
                        userId={user.id}
                        SetUser={SetUser}
                        SetisUserUpdated={SetisUserUpdated}
                    />
                ) : (
                    <p>Loading...</p> // Debug log for loading state
                )}
        </div> 
    </div>
)
}
export default ProfilePage
