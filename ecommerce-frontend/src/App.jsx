import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Customer from './components/Customer';
import Home from './components/Home';


export default function App() {
  return (
    <div >
      <Navbar />
      <main className="p-4 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/customers" element={<Customer />} />
        </Routes>
      </main>
    </div>
  );
}
