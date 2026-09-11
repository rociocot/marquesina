import React from 'react';
import ProductoForm from '../components/productos/ProductoForm';

export default function AdminPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Panel de Administración - Cartelera Digital</h1>
      <hr style={{ margin: '20px 0' }} />
      <ProductoForm />
    </div>
  );
}