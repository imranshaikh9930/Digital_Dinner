import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <nav className="bg-gradient-to-r from-green-400 via-green-600 to-green-800 text-white p-4 flex items-center justify-between flex-wrap shadow-lg">
      <h2 className="text-2xl font-bold">Digital Dinner</h2>

      {/* Hamburger */}
      <button
  onClick={() => setOpen(!open)}
  className="lg:hidden block text-white focus:outline-none text-2xl"
  aria-label="Toggle menu"
>
  {open ? <RxCross2 /> : <IoMenuSharp />}
</button>

      {/* Links */}
      <div
        className={`${
          open ? "block" : "hidden"
        } w-full lg:flex lg:items-center lg:w-auto lg:space-x-6`}
      >
        <Link
          to="/orderHistory"
          className="block mt-2 lg:mt-0 hover:text-gray-200"
        >
          Orders
        </Link>
        <Link to="/menu" className="block mt-2 lg:mt-0 hover:text-gray-200">
          Menu
        </Link>
        <Link
          to="/cart"
          className="block mt-2 lg:mt-0 hover:text-gray-200 relative"
        >
          Cart
          <span className="absolute -top-2 left-8 md:-top-3 md:-right-3 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}
