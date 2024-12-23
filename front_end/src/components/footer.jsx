"use client";
import { useEffect, useState } from "react";

const Footer = () => {
    // Hàm để cuộn lên đầu trang
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth" // Thêm hiệu ứng cuộn mượt
      });
    };
 
    // Sử dụng useEffect để thực hiện các tác vụ khởi tạo sau khi component được render
    useEffect(() => {
      // Các logic khởi tạo ở đây nếu cần
    }, []); // [] là dependency array, nếu bạn không cần sử dụng các biến từ bên ngoài, bạn có thể để nó trống
 



return (
<footer className=" bg-[rgb(134,111,70)] text-white py-8 mt-8 w-full mt-40 px-4 divide-y" style={{ fontFamily: 'Open Sans, sans-serif' }}>
{/* Container A */}
<div className="w-full mb-4 md:mb-0 flex justify-center items-center">
 {/* Container Footer_Inner */}
 <div className="inline-block flex justify-around items-center" style={{ width: '1360px', height: '322.7px' }}>




   {/* Container 1 */}
   <div className="inline-block  p-6 text-white" style={{ width: '305px', height: '282.7px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
             {/* Container nhỏ 1 */}
             <div className="flex flex-col  mb-2" style={{ width: '255px', height: '21.45px' }}>
                       <h2 className="text-sm font-bold">BE THE FIRST TO KNOW</h2>
                       <div style={{ height: '21.45px' }}></div>
             </div>
             {/* Container nhỏ 2 */}
             <div className=" text-white mt-1.5" style={{ width: '255px', height: '74,25px', lineHeight: '1.25' }}>
                       <p className="mb-1">Stay up to date with our newest</p>
                       <p className="mb-1">releases, exclusive offers,</p>
                       <p className="mb-1">and giveaways straight to your inbox.</p>
             </div>
             {/* Container nhỏ 3 */}
      <div className="text-white" style={{ width: '255px', height: '107.8px', marginTop: '15px' ,}}>
        <input type="email" required className=" w-full h-12 bg-transparent  border border-white px-4 text-white placeholder-white" placeholder="Enter your email address" />
        <button
          className="w-32 h-12 bg-[rgb(168,145,94)] text-white font-bold mt-3 text-sm"
          onClick={() => window.location.reload()} //sau khi nhấn vào button thì trang web sẽ reload
        >
          SUBSCRIBE
        </button>
      </div>
    </div>
 
   {/* Container 2 */}
   <div className="inline-block  p-6 text-white" style={{ width: '186.58px', height: '282.7px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
             {/* Container nhỏ 1 */}
             <div className="flex flex-col  mb-2" style={{ width: '136.58px', height: '21.45px' }}>
                       <h2 className="text-sm font-bold">POLICY</h2>
                       <div style={{ height: '21.45px' }}></div>
                       </div>
                       {/* Container nhỏ 2 */}
                       <div className=" text-white" style={{ width: '136.58px', height: '196.5px', lineHeight: '1.25' }}>
                                 <p className="mb-1"><a href="/shipping-policy" className="text-white">Shipping Policy</a></p>
                                 <p className="mb-1"><a href="/refund-policy" className="text-white">Refund Policy</a></p>
                                 <p className="mb-1"><a href="/privacy-policy" className="text-white">Privacy Policy</a></p>
                                 <p className="mb-1"><a href="/terms-of-service" className="text-white">Terms of Service</a></p>
                                 </div>
                                 </div>  








   {/* Container 3 */}
   <div className="inline-block  p-6 text-white" style={{ width: '186.58px', height: '282.7px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
             {/* Container nhỏ 1 */}
             <div className="flex flex-col  mb-2" style={{ width: '136.58px', height: '21.45px' }}>
                       <h2 className="text-sm font-bold">HELP</h2>
                       <div style={{ height: '21.45px' }}></div> {/* Khoảng trắng giữa HELP và đoạn văn */}
                       </div>
                       {/* Container nhỏ 2 */}
                       <div className=" text-white" style={{ width: '136.58px', height: '196.5px', lineHeight: '1.25' }}>
                                 <p className="mb-1"><a href="/faqs" className="text-white">FAQs</a></p>
                                 <p className="mb-1"><a href="/stores" className="text-white">Stores</a></p>
                                 </div>
                                 </div>




   {/* Container 4 */}
   <div className="inline-block  p-6" style={{ width: '400px', height: '282.7px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
     {/* Container nhỏ 1 */}
     <div className="flex flex-col  mb-4" style={{ width: '350px', height: '21.45px' }}>
       <h2 className="text-sm font-bold">CENTELLA</h2>
       <div style={{ height: '21.45px' }}></div> {/* Khoảng trắng giữa CERISÉ và đoạn văn */}
     </div>
     {/* Container nhỏ 2 */}
     <div className="" style={{ width: '380px', height: '196.5px' }}>
       {/* © CERISÉ */}
       <p className="text-sm mt-1">
             <span>CENTELLA GLOBAL INC.</span>
             <br/>
             <a href="/home" className="text-white"></a>
             </p>
             <br/>
             <p className="text-sm">FLAGSHIP STORE</p>
             <p className="text-sm">365 Le Van Sy Street, Ward 13, District 3, HCMC, Viet Nam</p>
             <br/>
             <p className="mb-2"><a href="mailto:hello@cerisevietnam.com" className="text-white">hello@centellavietnam.com</a></p>
             </div>
           
     {/* Container nhỏ 3 */}
     <div className="mt-4 flex space-x-6" style={{ width: '350px', height: '64.75px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
     <a rel="noopener noreferrer" href="#" title="Facebook" className="flex items-center p-1">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
							<path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
						</svg>
					</a>
					<a rel="noopener noreferrer" href="#" title="Twitter" className="flex items-center p-1">
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
							<path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
						</svg>
					</a>
					<a rel="noopener noreferrer" href="#" title="Instagram" className="flex items-center p-1">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 fill-current">
							<path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z"></path>
						</svg>
					</a>
     </div>    
    
 </div>

 {/* Button để cuộn lên đầu trang */}
 <button
 onClick={scrollToTop}
 className=" items-center "
 style={{
   width: '55px',
   height: '55px',
   marginBottom: "20px",
   position: "fixed",
   bottom: "0",
   right: "20px" // Di chuyển sang bên trái 20px
}}
>
   {/* Chèn hình ảnh */}
   <svg class="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/>
</svg>
   </button>
 
 
   {/* Button liên kết khác với dòng chữ Rewards và hình ảnh */}
   <a
   href="/voucher"
   className="bg-[rgb(168,145,94)] text-white font-bold py-0 px-0  rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center"
   style={{
             width: '130px',
             height: '55px',
             marginBottom: "20px",
             position: "fixed",
             bottom: "0",
             left: "20px" // Nằm ở góc trái màn hình
   }}
                >
                    <div className="flex items-center justify-center w-full h-full">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.875 1.25 3.875 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.155-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z" />
                        </svg>

                        <span className="text-sm px-2">Rewards</span>
                    </div>
                </a>
</div>
</div>
<div className="py-6 text-sm text-center text-white">© 2024 Company Co. All rights reserved.</div>

</footer>
);
};




export default Footer;