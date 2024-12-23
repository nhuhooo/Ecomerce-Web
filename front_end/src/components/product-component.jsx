import Link from "next/link";
import { useAppContext } from "@/components/context";
import { callAPI } from "@/utils/api-caller";
import { getUser, isLogined } from "@/utils/helper"; // Import isLogined here
import { useState } from "react";
import '@/components/style.css';

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

const ProductComponent = ({ productName, price, imageUrl, imageUrl2, id }) => {
  const { setShoppingCart } = useAppContext();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const addToCart = async (productId) => {
    if (!isLogined()) {
      // Show alert message for login requirement
      setAlertMessage("Bạn phải đăng nhập để mua hàng");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      return;
    }

    try {
      const res = await callAPI("/add-to-shopping-cart", "POST", { productId, amount: 1 });
      setShoppingCart(res.data);
      setAlertMessage("Thêm vào giỏ hàng thành công");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <div>
        <div className="items-center h-70 w-72">
          <div className="container">
            <Link href={"/products/" + id}>
              <img src={URL_SERVER + imageUrl} alt="Product" className="h-65 w-72 object-cover" />
              <div className="overlay">
                <img src={URL_SERVER + imageUrl2} alt="Product" className="h-65 w-72 object-cover" />
              </div>
            </Link>

            <button onClick={(e) => { addToCart(id); e.stopPropagation(); }} className="ml-auto font-semibold overlay1">
              ADD TO CART
            </button>
          </div>
          <Link href={"/products/" + id}>
            <div>
              <p className="h-4 text-center font-semibold text-black block capitalize my-3">{productName}</p>
            </div>
            <div className="pt-4">
              <p className="text-center font-bold text-custom-brown cursor-auto my-3">${price}</p>
            </div>
          </Link>
        </div>
      </div>

      {showAlert && (
        <div className="fixed bottom-[1%] right-[1%] flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Success alert!</span> {alertMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductComponent;
