import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean;
  colorTarjeta: string;
  imagenUrl: string;
}

export default function TvPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await axios.get('http://localhost:8080/api/productos');
        setProductos(respuesta.data);
      } catch (error) {
        console.error('Error al cargar productos para la TV:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
    
    // Polling cada 10 segundos para actualizar la cartelera automáticamente
    const intervalo = setInterval(obtenerProductos, 10000);
    return () => clearInterval(intervalo);
  }, []);

  if (cargando) {
    return <div style={{ padding: '40px', color: '#fff', backgroundColor: '#121212', minHeight: '100vh' }}>Cargando cartelera...</div>;
  }

  return (
  <div style={{ padding: '30px', backgroundColor: '#1a1a1a', minHeight: '100vh', color: '#fff' }}>
    <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Cartelera Digital</h1>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
      {productos.map((prod) => (
        <div 
          key={prod.id || prod.nombre} 
          style={{ 
            backgroundColor: prod.colorTarjeta || '#333', 
            borderRadius: '12px', 
            padding: '20px', 
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {prod.imagenUrl && (
            <img 
              src={prod.imagenUrl.startsWith('http') ? prod.imagenUrl : `http://localhost:8080/uploads/${prod.imagenUrl}`} 
              alt={prod.nombre} 
              style={{ width: '100%', height: '180px', objectFit: 'contain', borderRadius: '8px' }}
            />
          )}
          <div style={{ marginTop: '15px' }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>{prod.nombre}</h2>
            <p style={{ margin: '0 0 10px 0', opacity: 0.9 }}>{prod.descripcion}</p>
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>${prod.precio}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}