import React, { useState } from 'react';
// import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from "../feature/cart/cartSlice";
import axios from 'axios';
// import axios from "../api/axiosInstance"
const OrderForm = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.name || !form.phone || !form.email) {
      setError('All fields are required');
      return;
    }
  
    // Validate phone number (must be 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(form.phone)) {
      setError('Phone number must be exactly 10 digits');
      return;
    }
  
    const orderData = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      items: cartItems.map((item) => ({
        itemId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
    };
  
    try {

     
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/order`, orderData);
 
      if (res.status === 200 || res.status === 201) {
        setOrderPlaced(true);
        setError('');
  
      
        setTimeout(() => {
          dispatch(clearCart());
        }, 2000); 
  
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong while placing your order.');
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6">
      {orderPlaced ? (
        <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-green-600">Order Placed Successfully!</h3>
          <p>Thank you for your order. You'll hear from us soon!</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-6">Place Your Order</h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500"
            >
              Submit Order
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default OrderForm;
