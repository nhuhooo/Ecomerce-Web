const ShoppingCartItem = ({image, productName, category, price, amount, add, decrease,remove, productId}) => {
    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6  sm:flex sm:justify-start">
            <img src={image} className="h-[8em]"/>
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <p  className="  text-l font-medium text-gray-900">{productName}</p>
                    <p className="mt-1 text-xs text-gray-700">{category}</p>
                    <div className="pt-5 flex items-center border-gray-100">
                        <button onClick={()=>{decrease(productId)}} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
                        <input className="h-8 w-8 border bg-white text-center text-s outline-none"  value={amount} min="1" />
                        <button onClick={()=>{add(productId)}} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>

                    </div>
                    <p className="pt-5 text-lg font-bold">${price}</p>

                </div>
                <div>
                    
                    <div className="flex items-center space-x-4">
                        <button onClick={()=>remove(productId, -amount)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShoppingCartItem;