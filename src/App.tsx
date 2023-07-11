import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

export default function App() {
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={ <Navigate replace to ="/home" /> }
        />
        <Route
          path="/home"
          element={ <Home /> }
        />
        <Route
          path="/shopping-cart"
          element={ <ShoppingCart /> }
        />
      </Routes>
    </main>
  );
}