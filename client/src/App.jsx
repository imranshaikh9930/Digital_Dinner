import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Menu from "./pages/Menu";
import Layout from "./Components/Layout";
import OrderForm from "./pages/OrderForm";
import OrderHistory from "./pages/OrderHistory";
import SingleMenuItems from "./pages/SingleMenuItems";
import { Toaster } from "react-hot-toast";
import "./App.css";
import ProtectedRoute from "./Components/Protected";
function App() {
  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="menu" element={<Menu />} />
            <Route path="cart" element={<Cart />} />
            <Route
              path="order"
              element={
                <ProtectedRoute>
                  <OrderForm />
                 </ProtectedRoute>
              }
            />
            <Route path="/orderHistory" element={<OrderHistory />} />
            <Route path="/menu/:id" element={<SingleMenuItems />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
