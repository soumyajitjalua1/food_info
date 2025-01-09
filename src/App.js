// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CuisineList from './components/CuisineList';
import AddCuisine from './components/AddCuisine';
import CuisineDetail from './components/CuisineDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CuisineList />} />
        <Route path="/add" element={<AddCuisine />} />
        <Route path="/cuisine/:id" element={<CuisineDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;