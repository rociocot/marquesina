import React from 'react';

export default function PreviewModal({ producto, abierto, alCerrar, alConfirmar }) {
  if (!abierto) return null;

  const esMixto = producto.posicionTexto === 'mixto';

  const estiloTarjeta = {
    backgroundColor: producto.colorTarjeta || '#333',
    backgroundImage: producto.imagenFondoUrl ? `url(${producto.imagenFondoUrl})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '25px',
    borderRadius: '12px',
    marginBottom: '25px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: esMixto ? 'row' : 'column',
    alignItems: 'center',
    textAlign: esMixto ? 'left' : (producto.posicionTexto || 'center'),
    gap: '20px',
    fontFamily: producto.fuenteSeleccionada || 'Arial, sans-serif',
    color: producto.colorTexto || '#ffffff',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#1e1e1e', color: '#fff', padding: '30px',
        borderRadius: '16px', maxWidth: '600px', width: '90%',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)', textAlign: 'center'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem', color: '#aaa' }}>
          Previsualización en Pantalla TV
        </h2>

        <div style={estiloTarjeta}>
          {producto.imagenFondoUrl && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1 }}></div>
          )}

          {producto.imagenUrl && (
            <img 
              src={producto.imagenUrl} 
              alt={producto.nombre} 
              style={{ 
                width: esMixto ? '40%' : '100%', 
                maxHeight: '180px', 
                objectFit: 'contain', 
                borderRadius: '8px',
                zIndex: 2,
                position: 'relative'
              }}
            />
          )}
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', zIndex: 2, position: 'relative' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.8rem', color: 'inherit' }}>{producto.nombre || 'Nombre del Producto'}</h3>
            <p style={{ margin: '0 0 15px 0', opacity: 0.9, fontSize: '1rem', color: 'inherit' }}>{producto.descripcion || 'Sin descripción'}</p>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'inherit' }}>
              ${producto.precio || '0'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button 
            type="button" 
            onClick={alCerrar}
            style={{
              padding: '10px 20px', borderRadius: '8px', border: '1px solid #555',
              backgroundColor: 'transparent', color: '#fff', cursor: 'pointer'
            }}
          >
            Volver a editar
          </button>

          <button 
            type="button" 
            onClick={alConfirmar}
            style={{
              padding: '10px 20px', borderRadius: '8px', border: 'none',
              backgroundColor: '#4CAF50', color: '#fff', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            Guardar y Publicar
          </button>
        </div>
      </div>
    </div>
  );
}