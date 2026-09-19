import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean;
  colorTarjeta: string;
  colorTexto?: string;
  fuenteSeleccionada?: string;
  imagenUrl: string;
}

type PasoSecuencia = 
  | { tipo: 'agrupado'; productos: Producto[]; paginaIndex: number }
  | { tipo: 'individual'; producto: Producto };

export default function TvPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  
  const [pasoActualIndex, setPasoActualIndex] = useState<number>(0);
  const [animando, setAnimando] = useState<boolean>(false);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await axios.get('http://localhost:8080/api/productos');
        const visibles = respuesta.data.filter((p: Producto) => p.disponible);
        setProductos(visibles); 
      } catch (error) {
        console.error('Error al conectar con el backend:', error);
        setProductos([]); 
        setCargando(false);
      }
    };

    obtenerProductos();
    const intervaloDatos = setInterval(obtenerProductos, 30000);
    return () => clearInterval(intervaloDatos);
  }, []);

  const generarSecuencia = (lista: Producto[]): PasoSecuencia[] => {
    if (lista.length === 0) return [];
    const secuencia: PasoSecuencia[] = [];

    if (lista.length > 1) {
      for (let i = 0; i < lista.length; i += 3) {
        const lote = lista.slice(i, i + 3);
        secuencia.push({
          tipo: 'agrupado',
          productos: lote,
          paginaIndex: Math.floor(i / 3)
        });
      }
    }

    lista.forEach((prod) => {
      secuencia.push({
        tipo: 'individual',
        producto: prod
      });
    });

    return secuencia;
  };

  const secuenciaPasos = generarSecuencia(productos);

  useEffect(() => {
    if (secuenciaPasos.length <= 1) return;

    const intervaloRotacion = setInterval(() => {
      setAnimando(true); 

      setTimeout(() => {
        setPasoActualIndex((prev) => (prev + 1) % secuenciaPasos.length);
        setAnimando(false); // Entra el nuevo 
      }, 500); // Tiempo medio para cambiar

    }, 8000);

    return () => clearInterval(intervaloRotacion);
  }, [secuenciaPasos.length]);

  if (cargando || secuenciaPasos.length === 0) {
    return null;
  }

  const pasoActual = secuenciaPasos[pasoActualIndex];

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
      {pasoActual.tipo === 'individual' ? (
        // Vista Individual 
        <div style={{ 
          width: '100vw', height: '100vh', backgroundColor: pasoActual.producto.colorTarjeta || '#1a252c', 
          margin: 0, padding: '40px', boxSizing: 'border-box', display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', fontFamily: pasoActual.producto.fuenteSeleccionada || 'sans-serif',
          color: pasoActual.producto.colorTexto || '#ffffff', overflow: 'hidden', gap: '30px',
          position: 'absolute', top: 0, left: 0,
          opacity: animando ? 0 : 1,
          transform: animando ? 'scale(0.95)' : 'scale(1)',
          transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
        }}>
          {pasoActual.producto.imagenUrl && (
            <img src={pasoActual.producto.imagenUrl.startsWith('http') ? pasoActual.producto.imagenUrl : `http://localhost:8080/uploads/${pasoActual.producto.imagenUrl}`} alt={pasoActual.producto.nombre} style={{ width: '40vw', maxHeight: '45vh', objectFit: 'contain', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))' }} />
          )}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', maxWidth: '800px' }}>
            <h1 style={{ margin: 0, fontSize: '4.5rem', fontWeight: '900', textShadow: '0 4px 8px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>{pasoActual.producto.nombre}</h1>
            <p style={{ margin: 0, opacity: 0.95, fontSize: '2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{pasoActual.producto.descripcion}</p>
          </div>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.3)', padding: '15px 40px', borderRadius: '20px', boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.4)', marginTop: '10px' }}>
            ${pasoActual.producto.precio}
          </div>
        </div>
      ) : (
        // Vista Agrupada
        <div style={{ 
          width: '100vw', height: '100vh', backgroundColor: '#000', margin: 0, padding: 0, 
          boxSizing: 'border-box', display: 'flex', flexDirection: 'row', overflow: 'hidden',
          position: 'absolute', top: 0, left: 0
        }}>
          {pasoActual.productos.map((prod, index) => {
            const esMedio = index === 1;
            // index 0 y 2 (bordes): suben 
            // index 1 (medio): hace lo opuesto
            let translateYValue = '0';
            if (animando) {
              translateYValue = esMedio ? '-100vh' : '100vh';
            }

            return (
              <div 
                key={prod.id || prod.nombre} 
                style={{ 
                  flex: 1, 
                  backgroundColor: prod.colorTarjeta || '#1a252c', 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '30px',
                  fontFamily: prod.fuenteSeleccionada || 'sans-serif',
                  color: prod.colorTexto || '#ffffff',
                  boxSizing: 'border-box',
                  borderRight: '2px solid rgba(0,0,0,0.2)',
                  gap: '20px',
                  height: '100%',
                  transform: `translateY(${translateYValue})`,
                  opacity: animando ? 0 : 1,
                  transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease-in-out'
                }}
              >
                {prod.imagenUrl && (
                  <img src={prod.imagenUrl.startsWith('http') ? prod.imagenUrl : `http://localhost:8080/uploads/${prod.imagenUrl}`} alt={prod.nombre} style={{ width: '160px', height: '160px', objectFit: 'contain', filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.4))' }} />
                )}
                <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', textTransform: 'uppercase', textShadow: '0 3px 6px rgba(0,0,0,0.3)' }}>
                  {prod.nombre}
                </h1>
                <p style={{ margin: 0, fontSize: '1.3rem', opacity: 0.9, fontWeight: '500', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  {prod.descripcion}
                </p>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.25)', padding: '10px 25px', borderRadius: '12px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}>
                  ${prod.precio}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}