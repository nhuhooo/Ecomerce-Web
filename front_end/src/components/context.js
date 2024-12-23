// src/context/state.js
"use client";
import { createContext, useContext, useState } from 'react';


const AppContext = createContext();

export function AppWrapper({ children }) {
    const [shoppingCart, setShoppingCart] = useState([])
    const [isFetchedShoppingCart, setIsFetchedShoppingCart] = useState(false)
     
  let sharedState = {
    shoppingCart, setShoppingCart, isFetchedShoppingCart, setIsFetchedShoppingCart
  }
  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}