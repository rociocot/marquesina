import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import TvPage from './pages/TvPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige la ruta raiz a /admin por defecto */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
        
        {/* Ruta para el cajero (Monitor 1) */}
        <Route path="/admin" element={<AdminPage />} />
        
        {/* Ruta para la TV colgada en el local (Monitor 2) */}
        <Route path="/tv" element={<TvPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;