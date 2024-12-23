"use client";

import React, { useState } from "react";
import { callAPI } from '@/utils/api-caller.js';

const Test = () => {
  const [inputOrderID, setInputOrderID] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);

  const fetchOrderData = async () => {
    try {
      // Make sure to call the endpoint where orderID is expected in the URL
      const response = await callAPI('GET', `http://localhost:1337/api/orders/${inputOrderID}`);
      setOrderData(response.data); // Adjusting here to use the full response
      setError(null); // Reset error state on successful fetch
    } catch (err) {
      const errorMsg = err.response?.data?.error?.message || 'Failed to fetch order data';
      setError(errorMsg);
      setOrderData(null); // Reset order data on error
      console.error('Error fetching order data:', err);
    }
  };

  return (
    <div>
      <h2>Order Tracking</h2>
      
      <div>
        <label htmlFor="orderID">Enter Order ID:</label>
        <input
          type="text"
          id="orderID"
          value={inputOrderID}
          onChange={(e) => setInputOrderID(e.target.value)}
          placeholder="e.g., 20241030231510"
        />
        <button onClick={fetchOrderData}>Fetch Order Data</button>
      </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {orderData ? (
        <div>
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> {orderData.orderID}</p> {/* Adjusting here to access orderID directly */}
          <p><strong>Total Price:</strong> {orderData.attributes.totalPrice}</p>
          <p><strong>Address:</strong> {orderData.attributes.address}</p>
          <p><strong>Phone:</strong> {orderData.attributes.phone}</p>
          {/* Render additional details if needed */}
        </div>
      ) : (
        <p>No order data available</p>
      )}
    </div>
  );
};

export default Test;
