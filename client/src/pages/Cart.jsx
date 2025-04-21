import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, clearCart } from "../feature/cart/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {/* Cart Items */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                {/* Item Details */}
                <div className="flex items-center space-x-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600 text-sm">₹{item.price}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="text-xl font-medium text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>

                {/* Price and Remove Button */}
                <div className="flex flex-col items-end space-y-2">
                  <p className="text-lg font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => dispatch(clearCart())}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center mt-6">
            <h3 className="text-2xl font-semibold text-gray-900">Total</h3>
            <p className="text-2xl font-bold text-green-600">₹{totalAmount}</p>
          </div>

          {/* Checkout Button */}
          <div className="mt-6 ">
  <Link
    to="/order"
    className=" bg-green-600 block w-full px-6 py-4 text-center text-lg font-semibold text-white  rounded-lg shadow-lg hover:from-gray-800 hover:to-black transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
  >
    Place Your Order
  </Link>
</div>

        </>
      )}
    </div>
  );
};

export default Cart;
