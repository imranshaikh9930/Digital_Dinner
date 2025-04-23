import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuItem } from '../feature/menu/menuSlice';
import { addToCart } from '../feature/cart/cartSlice';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../Components/Loader';
const Menu = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.menu);

  console.log(items);
  const [categories, setCategories] = useState({
    Appetizers: [],
    'Main Courses': [],
    Desserts: [],
    Drinks: [],
  });

  useEffect(() => {
    dispatch(fetchMenuItem());
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      const categorizedItems = {
        Appetizers: items.filter((item) => item.category === 'Appetizers'),
        'Main Courses': items.filter((item) => item.category === 'Main Courses'),
        Desserts: items.filter((item) => item.category === 'Desserts'),
        Drinks: items.filter((item) => item.category === 'Drinks'),
      };
      setCategories(categorizedItems);
    }
  }, [items]);

  const handleAddMenu = (product) => {
    dispatch(addToCart(product));
    toast.success("Item Added to Cart")
    // alert(`${product.name} added to cart`);
  };

  if (loading) return <Loader/>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="menu-container px-4 sm:px-8 py-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-12">🍽️ Delicious Menu</h1>

      {Object.entries(categories).map(([category, items]) => (
        <div key={category} className="mb-16">
         <h2 className="text-3xl font-semibold text-center text-white mb-8 p-4 rounded-lg bg-gradient-to-r from-green-400 via-green-600 to-green-800 shadow-lg transition-transform transform hover:text-green-100 duration-300">
  {category}
</h2>


          <div className="max-w-7xl mx-auto px-4">
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                >
                  <Link to={`/menu/${item._id}`} className="block overflow-hidden rounded-t-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    <p className="text-green-600 font-bold text-lg mb-3">₹{item.price}</p>
                    <button
                      className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all"
                      onClick={() => handleAddMenu(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
