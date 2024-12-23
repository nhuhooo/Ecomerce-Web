"use client";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import jsQR from "jsqr"; // Ensure jsQR is imported for QR code reading from images

const Tracking = () => {
 const [formData, setFormData] = useState({ origins: "" });
 const [trackingResults, setTrackingResults] = useState([]);
 const [currentStages, setCurrentStages] = useState([]);
 const [showQRReader, setShowQRReader] = useState(false);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);

 const stages = ["ORDER PLACED", "ARRIVED AT OLIST WAREHOUSE", "OUT FOR DELIVERY", "DELIVERED SUCCESSFULLY"];

 const handleChange = (e) => {
   setFormData({ ...formData, [e.target.name]: e.target.value });
   setError(null); // Clear error on input change
 };

 const simulateOrderStatus = (index) => {
   return index === 1 ? 3 : Math.floor(Math.random() * stages.length); // Randomize status for first order
 };

 const handleSubmit = (e) => {
   e.preventDefault();
   setLoading(true);
   setError(null);

   const origins = formData.origins.split(",").map((origin) => origin.trim());
   const newResults = [];
   const newStages = [];

   origins.forEach((origin, index) => {
     if (!isValidTrackingNumber(origin)) {
       newResults.push({ trackingNumber: origin, status: null });
       alert(`Order ${origin} does not exist`);
       return;
     }

     const newStage = simulateOrderStatus(index);
     newResults.push({
       expectedArrival: "24/12/24",
       trackingNumber: origin,
       status: stages[newStage],
     });
     newStages.push(newStage);
   });

   setTrackingResults(newResults);
   setCurrentStages(newStages);
   setLoading(false);
 };

 const isValidTrackingNumber = (number) => {
   // Add your own validation logic here
   return number === "EB125966888VN" || number === "EI125556888VN";
 };

 const handleQRScan = (result) => {
   if (result) {
     setFormData({ origins: result.text });
     setShowQRReader(false);
   }
 };

 const handleFileChange = (e) => {
   const file = e.target.files[0];
   if (file) {
     const reader = new FileReader();
     reader.onload = () => {
       const img = new Image();
       img.src = reader.result;
       img.onload = () => {
         const canvas = document.createElement("canvas");
         const context = canvas.getContext("2d");
         canvas.width = img.width;
         canvas.height = img.height;
         context.drawImage(img, 0, 0, img.width, img.height);
         const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
         const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
         if (qrCode) {
           setFormData({ origins: qrCode.data });
           alert("QR code scanned: " + qrCode.data);
         } else {
           alert("No QR code found in the image.");
         }
       };
     };
     reader.readAsDataURL(file);
   }
 };

 const clearInputs = () => {
   setFormData({ origins: "" });
   setTrackingResults([]);
   setCurrentStages([]);
   setError(null);
 };

 return (
   <tracking className="bg-white text-black py-8 mt-1 w-full" style={{ fontFamily: "Open Sans, sans-serif" }}>
     <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-20px", marginLeft: "50px", alignItems: "center", width: "100%", height: "100vh", padding: "10px", boxSizing: "border-box" }}>
      
       <div >
        
         <div style={{ textAlign: "left", marginBottom: "5px" }} >
           <p style={{ fontSize: "24px", fontWeight: "bold" }} className="text-black">TRACK ORDER JOURNEY</p>
         </div>

         <div style={{ textAlign: "left", marginBottom: "20px" }}>
           <p style={{ fontSize: "15px", fontStyle: "italic" }}>(Separate multiple bills with commas)</p>
         </div>

         <div style={{ padding: "20px", border: "2px solid #2e76a6", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", backgroundColor: "#f9fafb" }}>
           <form onSubmit={handleSubmit}>
             <div className="mb-4 " >
               <label htmlFor="origins" className="block text-gray-700" >Enter Tracking Number</label>
               
               <div className="relative grid grid-flow-col auto-cols-max items-center gap-5">
               <input
                 type="text"
                 id="origins"
                 name="origins"
                 value={formData.origins}
                 onChange={handleChange}
                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Example: EB125966888VN, EI125556888VN"
                 required
               />
               or
               <button
             onClick={() => setShowQRReader(!showQRReader)}
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
</svg>

           </button>

           {showQRReader && (
             <div style={{ marginTop: "20px" }}>
               <QrReader onResult={handleQRScan} style={{ width: "100%" }} />
             </div>
           )}
or

           {/* Option to upload image */}
           <input
             type="file"
             accept="image/*"
             onChange={handleFileChange}
             className="mt-4"
           />
              </div>
             </div>

             <button
               type="submit"
               className={`w-full h-12 flex rounded-md justify-center items-center border  text-black ${loading ? 'opacity-50 cursor-not-allowed' : ''} hover:bg-[rgba(255,255,255,0.5)] hover:text-customPinky transition duration-500 ease-in-out`}
               disabled={loading}
             >
               {loading ? 'SEARCHING...' : 'SEARCH'}
             </button>
           </form>

           {/* Clear Inputs Button */}
           <button
             onClick={clearInputs}
             className="mt-4 w-full rounded-md h-12 flex justify-center items-center border  text-black hover:bg-[rgba(255,255,255,0.5)] hover:text-customPinky transition duration-500 ease-in-out mr-50"
           >
             CLEAR DATA
           </button>
         </div>
       </div>
     </div>
   </tracking>
 );
};
export default Tracking;
