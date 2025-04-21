import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from "../feature/cart/cartSlice";
import axios from 'axios';
import Loader from '../Components/Loader';

const SingleMenuItems = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Retrieve the id from the URL
 
  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        // Fetch the menu item data from the API
        const response = await axios.get(`https://digital-dinner-backend-01.onrender.com/api/menu/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch menu item');
        }

        // const data = await response.json();
        setMenuItem(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600"><Loader/></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center mt-10">{error}</div>;
  }

  if (!menuItem) {
    return <div className="text-center text-gray-600 mt-10">Menu item not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start p-6">
          {/* Image */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/3">
            <img
              src={menuItem.image}
              alt={menuItem.name}
              className="w-full h-72 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Details */}
          <div className="md:ml-8 md:w-2/3">
            <h2 className="text-3xl font-semibold text-gray-800">{menuItem.name}</h2>
            <p className="text-lg text-gray-600 mt-2">{menuItem.description}</p>
            <p className="text-2xl font-bold text-green-600 mt-4">₹{menuItem.price}</p>

            {/* Quantity Selector */}
            <div className="mt-4">
              {/* <label htmlFor="quantity" className="text-lg text-gray-700">
                Quantity:
              </label>
              <select id="quantity" className="mt-2 p-2 w-20 border rounded-md">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select> */}
            </div>

            {/* Add to Cart Button */}
            <button
              className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 w-full md:w-auto"
              onClick={() => dispatch(addToCart(menuItem))}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMenuItems;
