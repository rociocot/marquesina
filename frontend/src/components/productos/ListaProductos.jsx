import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListaProductos({ onIrAFormulario, onEditarProducto }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const respuesta = await axios.get('http://localhost:8080/api/productos');
      setProductos(respuesta.data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    } finally {
      setCargando(false);
    }
  };

  const handleToggleDisponible = async (producto, e) => {
    const nuevoEstado = e.target.checked;
    try {
      setProductos(productos.map(p => p.id === producto.id ? { ...p, disponible: nuevoEstado } : p));
      await axios.put(`http://localhost:8080/api/productos/${producto.id}`, {
        ...producto,
        disponible: nuevoEstado
      });
    } catch (error) {
      console.error("Error al actualizar la disponibilidad:", error);
      cargarProductos();
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/productos/${id}`);
      setProductos(productos.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("No se pudo eliminar el producto.");
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '80vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#121212', padding: '20px 24px', borderRadius: '12px', border: '1px solid #262626' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#fff' }}>Catálogo Actual</h2>
          <p style={{ fontSize: '0.85rem', color: '#a3a3a3', margin: '4px 0 0 0' }}>Administra los productos que se muestran en la pantalla</p>
        </div>
        <button 
          type="button"
          onClick={onIrAFormulario}
          style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Agregar Producto
        </button>
      </div>

      <div style={{ backgroundColor: '#121212', borderRadius: '12px', border: '1px solid #262626', padding: '24px' }}>
        {cargando ? (
          <p style={{ textAlign: 'center', color: '#a3a3a3', padding: '20px' }}>Cargando productos...</p>
        ) : productos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#a3a3a3', padding: '20px' }}>No hay productos cargados todavía.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {productos.map((prod) => (
              <div 
                key={prod.id} 
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  backgroundColor: '#171717', padding: '16px', borderRadius: '8px', 
                  border: '1px solid #262626', opacity: prod.disponible ? 1 : 0.5 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img 
                    src={prod.imagenUrl || 'https://via.placeholder.com/60'} 
                    alt={prod.nombre} 
                    style={{ width: '50px', height: '50px', objectFit: 'contain', backgroundColor: '#262626', borderRadius: '6px', padding: '4px' }} 
                  />
                  <div>
                    <h3 style={{ margin: '0 0 2px 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#fff' }}>{prod.nombre}</h3>
                    <p style={{ margin: '0 0 2px 0', fontSize: '0.8rem', color: '#a3a3a3' }}>{prod.descripcion}</p>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#34d399' }}>${prod.precio}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input 
                      type="checkbox" 
                      checked={prod.disponible} 
                      onChange={(e) => handleToggleDisponible(prod, e)}
                      style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#059669' }}
                    />
                    <span style={{ color: prod.disponible ? '#34d399' : '#f87171' }}>
                      {prod.disponible ? 'Visible' : 'Oculto'}
                    </span>
                  </label>

                  <button 
                    type="button"
                    onClick={() => onEditarProducto(prod)}
                    style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Editar
                  </button>

                  <button 
                    type="button"
                    onClick={() => handleEliminar(prod.id)}
                    style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}