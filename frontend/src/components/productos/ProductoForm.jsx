import React, { useState } from 'react';
import { removeBackground } from '@imgly/background-removal';
import axios from 'axios';
import PreviewModal from './PreviewModal';
import CamposTexto from './CamposTexto';
import OpcionesFondo from './OpcionesFondo';

const COLOR_HEX_INICIAL = '#1a252c';
const COLOR_TEXTO_INICIAL = '#ffffff';

export default function ProductoForm() {
  const [nombre, setNombre] = useState('Agua mineral');
  const [descripcion, setDescripcion] = useState('300 ml');
  const [precio, setPrecio] = useState('1500');
  
  // Nuevos estados para Estilo y Texto
  const [colorTarjeta, setColorTarjeta] = useState(COLOR_HEX_INICIAL);
  const [colorTexto, setColorTexto] = useState(COLOR_TEXTO_INICIAL);
  const [fuenteSeleccionada, setFuenteSeleccionada] = useState('Arial, sans-serif');
  const [posicionTexto, setPosicionTexto] = useState('center');
  
  const [imagenFondo, setImagenFondo] = useState(null);
  const [vistaPreviaFondo, setVistaPreviaFondo] = useState(null);

  const [imagenProducto, setImagenProducto] = useState(null);
  const [vistaPreviaProducto, setVistaPreviaProducto] = useState(null);
  
  const [asignadoTv, setAsignadoTv] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [mensajeEstadoIA, setMensajeEstadoIA] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleProductoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagenProducto(file);
    setVistaPreviaProducto(URL.createObjectURL(file));
    setMensajeEstadoIA('');
  };

  const handleFondoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagenFondo(file);
    setVistaPreviaFondo(URL.createObjectURL(file));
  };

  const handleQuitarFondoIA = async () => {
    if (!imagenProducto) {
      alert('Primero selecciona una imagen de producto.');
      return;
    }

    try {
      setCargando(true);
      setMensajeEstadoIA('Iniciando IA (procesando en navegador)...');
      
      const blobProcesado = await removeBackground(imagenProducto);
      const archivoPng = new File([blobProcesado], 'sin-fondo.png', { type: 'image/png' });
      
      setImagenProducto(archivoPng);
      setVistaPreviaProducto(URL.createObjectURL(archivoPng));
      setMensajeEstadoIA('¡Fondo removido con éxito!');
      
      setTimeout(() => setMensajeEstadoIA(''), 4000);
    } catch (error) {
      console.error("Error detallado al procesar la IA:", error);
      setMensajeEstadoIA('Falló la IA.');
    } finally {
      setCargando(false);
    }
  };

  const ejecutarGuardado = async () => {
    try {
      setCargando(true);
      const formData = new FormData();

      const productoDTO = {
        nombre,
        descripcion,
        precio: precio ? parseFloat(precio) : 0,
        disponible: true,
        asignadoTv: parseInt(asignadoTv),
        colorTarjeta,
        colorTexto,
        fuenteSeleccionada,
        posicionTexto,
        imagenUrl: '',
        imagenFondoUrl: ''
      };

      formData.append('producto', new Blob([JSON.stringify(productoDTO)], { type: 'application/json' }));
      if (imagenFondo) formData.append('imagenFondo', imagenFondo);
      if (imagenProducto) formData.append('imagenProducto', imagenProducto);

      await axios.post('http://localhost:8080/api/productos', formData);
      alert('¡Producto guardado con éxito!');
      setModalAbierto(false);
    } catch (error) {
      console.error(error);
      alert('Error al guardar el producto.');
    } finally {
      setCargando(false);
    }
  };

  const productoActual = {
    nombre,
    descripcion,
    precio,
    colorTarjeta,
    colorTexto,
    fuenteSeleccionada,
    posicionTexto,
    imagenUrl: vistaPreviaProducto,
    imagenFondoUrl: vistaPreviaFondo
  };

  const estiloTarjetaDinamico = {
    backgroundColor: colorTarjeta,
    backgroundImage: vistaPreviaFondo ? `url(${vistaPreviaFondo})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: posicionTexto === 'mixto' ? 'row' : 'column',
    alignItems: 'center',
    textAlign: posicionTexto === 'mixto' ? 'left' : posicionTexto,
    gap: '20px',
    fontFamily: fuenteSeleccionada,
    color: colorTexto,
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#ffffff', padding: '32px', boxSizing: 'border-box', gap: '32px' }}>
      
      {/* Columna Izquierda: Formulario */}
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: '#121212', padding: '24px', borderRadius: '12px', border: '1px solid #262626', boxSizing: 'border-box', height: 'fit-content' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '1px solid #404040', paddingBottom: '8px', margin: 0 }}>Gestión de Producto</h2>

        <CamposTexto 
          nombre={nombre} setNombre={setNombre}
          precio={precio} setPrecio={setPrecio}
          descripcion={descripcion} setDescripcion={setDescripcion}
          asignadoTv={asignadoTv} setAsignadoTv={setAsignadoTv}
        />

        {/* Componente modular de Opciones de Fondo, Colores y Fuentes */}
        <OpcionesFondo 
          colorTarjeta={colorTarjeta} setColorTarjeta={setColorTarjeta}
          posicionTexto={posicionTexto} setPosicionTexto={setPosicionTexto}
          colorTexto={colorTexto} setColorTexto={setColorTexto}
          fuenteSeleccionada={fuenteSeleccionada} setFuenteSeleccionada={setFuenteSeleccionada}
        />

        {/* Input personalizado para la Imagen de Fondo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', backgroundColor: '#171717', padding: '12px', borderRadius: '8px', border: '1px solid #262626' }}>
          <label style={{ fontSize: '0.875rem', color: '#d4d4d4', fontWeight: 'bold' }}>Imagen de Fondo de la Tarjeta (Opcional):</label>
          
          <label style={{ 
            display: 'inline-block', 
            padding: '8px 12px', 
            backgroundColor: '#262626', 
            color: '#ffffff', /* <-- Modifica aquí el color de la letra si lo deseas */
            borderRadius: '6px', 
            cursor: 'pointer', 
            fontSize: '0.85rem',
            textAlign: 'center',
            border: '1px solid #404040'
          }}>
            📂 Seleccionar archivo de fondo
            <input type="file" accept="image/*" onChange={handleFondoChange} style={{ display: 'none' }} />
          </label>

          {vistaPreviaFondo && (
            <button 
              type="button" 
              onClick={() => { setImagenFondo(null); setVistaPreviaFondo(null); }}
              style={{ alignSelf: 'flex-start', marginTop: '4px', background: 'transparent', border: 'none', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer' }}
            >
              Quitar imagen de fondo
            </button>
          )}
        </div>

        {/* Input personalizado para la Imagen del Producto */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#171717', padding: '12px', borderRadius: '8px', border: '1px solid #262626' }}>
          <label style={{ fontSize: '0.875rem', color: '#d4d4d4', fontWeight: 'bold' }}>Imagen del producto:</label>
          
          <label style={{ 
            display: 'inline-block', 
            padding: '8px 12px', 
            backgroundColor: '#262626', 
            color: '#ffffff', /* <-- Modifica aquí el color de la letra si lo deseas */
            borderRadius: '6px', 
            cursor: 'pointer', 
            fontSize: '0.85rem',
            textAlign: 'center',
            border: '1px solid #404040'
          }}>
            📦 Seleccionar imagen de producto
            <input type="file" accept="image/*" onChange={handleProductoChange} style={{ display: 'none' }} />
          </label>
          
          {vistaPreviaProducto && (
            <button 
              type="button" 
              disabled={cargando}
              onClick={handleQuitarFondoIA}
              style={{ 
                marginTop: '8px', padding: '8px 12px', backgroundColor: '#0891b2', color: '#fff', 
                fontWeight: '600', fontSize: '0.85rem', borderRadius: '6px', border: 'none', 
                cursor: cargando ? 'not-allowed' : 'pointer', opacity: cargando ? 0.6 : 1 
              }}
            >
              {cargando ? 'Procesando IA...' : '✨ Quitar fondo con IA'}
            </button>
          )}
          
          {mensajeEstadoIA && (
            <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: '500', marginTop: '4px' }}>{mensajeEstadoIA}</span>
          )}
        </div>
      </div>

      {/* Columna Derecha: Vista previa fija lateral */}
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '12px', position: 'sticky', top: '32px', height: 'fit-content' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#e5e5e5', margin: 0 }}>Previsualización en Directo (TV):</h3>
        
        <div style={{ width: '100%', minHeight: '450px', backgroundColor: '#121212', borderRadius: '12px', border: '2px solid #404040', padding: '24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          <div style={estiloTarjetaDinamico}>
            {vistaPreviaFondo && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '12px', zIndex: 1 }}></div>
            )}

            {vistaPreviaProducto && (
              <img 
                src={vistaPreviaProducto} 
                alt={nombre} 
                style={{ 
                  width: posicionTexto === 'mixto' ? '40%' : '150px', 
                  height: '150px', 
                  objectFit: 'contain', 
                  borderRadius: '8px',
                  filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.4))',
                  zIndex: 2,
                  position: 'relative'
                }} 
              />
            )}
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', zIndex: 2, position: 'relative' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.8rem', color: 'inherit', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{nombre || 'Nombre del Producto'}</h3>
              <p style={{ margin: '0 0 15px 0', opacity: 0.95, fontSize: '1rem', color: 'inherit', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>{descripcion || 'Sin descripción'}</p>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'inherit', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                ${precio || '0'}
              </span>
            </div>
          </div>
        </div>

        <button 
          type="button" 
          disabled={cargando}
          onClick={ejecutarGuardado}
          style={{ padding: '12px', backgroundColor: '#059669', color: '#fff', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer', opacity: cargando ? 0.5 : 1 }}
        >
          {cargando ? 'Guardando...' : 'Guardar y Publicar en TV'}
        </button>
      </div>

      <PreviewModal 
        producto={productoActual} 
        abierto={modalAbierto} 
        alCerrar={() => setModalAbierto(false)} 
        alConfirmar={ejecutarGuardado} 
      />

    </div>
  );
}