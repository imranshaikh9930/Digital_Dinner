import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet,useLocation } from 'react-router-dom'

const Layout = () => {
    const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
    <main className="flex-grow p-4">
    <Navbar />
    {location.pathname === '/' && (
     <div className="py-12 mb-8 flex justify-center items-center h-screen">
     <div className="text-center text-gray-900">
       <h2 className="text-5xl font-extrabold mb-4">Welcome to Digital Dinner!</h2>
       <p className="text-xl sm:text-2xl md:text-3xl max-w-3xl mx-auto">
         We are thrilled to bring you the best dining experience right at your fingertips. 
         Explore our menu, place your order, and enjoy delicious meals delivered to your door. 
         Bon Appétit! 🍽️
       </p>
     </div>
   </div>
   
    
       
        
        )}

      <Outlet />
    </main>
    <Footer />
  </div>
  
  )
}

export default Layout