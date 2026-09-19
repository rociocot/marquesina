import React, { useState } from 'react';
import ListaProductos from '../components/productos/ListaProductos';
import ProductoForm from '../components/productos/ProductoForm';

export default function AdminPage() {
  const [vista, setVista] = useState<'LISTA' | 'FORMULARIO'>('LISTA');
  const [productoAEditar, setProductoAEditar] = useState<any>(null); 

  const irACrear = () => {
    setProductoAEditar(null);
    setVista('FORMULARIO');
  };

  const irAEditar = (producto: any) => {
    setProductoAEditar(producto);
    setVista('FORMULARIO');
  };

  const volverALista = () => {
    setProductoAEditar(null);
    setVista('LISTA');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff', boxSizing: 'border-box' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Panel de Administración - Cartelera Digital</h1>
        {vista === 'FORMULARIO' && (
          <button 
            type="button"
            onClick={volverALista}
            style={{ backgroundColor: '#404040', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ← Volver al Listado
          </button>
        )}
      </div>

      <hr style={{ margin: '20px 0', borderColor: '#262626' }} />

      {vista === 'LISTA' ? (
        <ListaProductos 
          onIrAFormulario={irACrear} 
          onEditarProducto={irAEditar} 
        />
      ) : (
        <ProductoForm 
          productoExistente={productoAEditar} 
          onGuardadoExitoso={volverALista} 
        />
      )}

    </div>
  );
}