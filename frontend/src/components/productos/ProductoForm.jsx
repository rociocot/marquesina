import React, { useState } from 'react';
import removeBackground from '@imgly/background-removal';
import axios from 'axios';

import CamposTexto from './CamposTexto';
import OpcionesFondo from './OpcionesFondo';

const PALETA_COLORES = ['#FF1493', '#00E5FF', '#FFD700', '#FF4500', '#7B1FA2', '#00E676'];
const obtenerColorAleatorio = () => PALETA_COLORES[Math.floor(Math.random() * PALETA_COLORES.length)];

export default function ProductoForm() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');

  const [colorTarjeta, setColorTarjeta] = useState(obtenerColorAleatorio);
  const [tipoFondoIndividual, setTipoFondoIndividual] = useState('IMAGEN');
  const [colorFondoIndividual, setColorFondoIndividual] = useState('#FF5733');

  const [quitarFondo, setQuitarFondo] = useState(false);
  const [imagenArchivo, setImagenArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState(null);
  const [cargando, setCargando] = useState(false);

  const generarNuevoColor = () => setColorTarjeta(obtenerColorAleatorio());

  const handleImagenChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (quitarFondo) {
      setCargando(true);
      try {
        const blobProcesado = await removeBackground(file);
        const nuevoArchivo = new File([blobProcesado], file.name, { type: 'image/png' });
        setImagenArchivo(nuevoArchivo);
        setVistaPrevia(URL.createObjectURL(blobProcesado));
      } catch (error) {
        console.error("Error al remover fondo:", error);
        alert("Ocurrió un error al procesar la imagen con IA.");
      } finally {
        setCargando(false);
      }
    } else {
      setImagenArchivo(file);
      setVistaPrevia(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setCargando(true);

      const formData = new FormData();

      const productoDTO = {
        nombre: nombre,
        descripcion: descripcion,
        precio: parseFloat(precio),
        disponible: true,
        asignadoTv: 1,
        colorTarjeta: colorTarjeta,
        imagenUrl: tipoFondoIndividual === 'COLOR' ? colorFondoIndividual : ''
      };

      const productoBlob = new Blob([JSON.stringify(productoDTO)], { type: 'application/json' });
      formData.append('producto', productoBlob);

      if (imagenArchivo) {
        formData.append('imagen', imagenArchivo);
      }

      await axios.post('http://localhost:8080/api/productos', formData);

      alert('¡Producto guardado exitosamente!');

      setNombre('');
      setDescripcion('');
      setPrecio('');
      setImagenArchivo(null);
      setVistaPrevia(null);
      setColorTarjeta(obtenerColorAleatorio());

    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al conectar con el servidor Spring Boot.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '450px' }}>
      <h2>Crear Producto</h2>

      CamposTexto
        nombre={nombre}
        setNombre={setNombre}
        descripcion={descripcion}
        setDescripcion={setDescripcion}
        precio={precio}
        setPrecio={setPrecio}
      <>

      OpcionesFondo
        colorTarjeta={colorTarjeta}
        setColorTarjeta={setColorTarjeta}
        generarNuevoColor={generarNuevoColor}
        tipoFondoIndividual={tipoFondoIndividual}
        setTipoFondoIndividual={setTipoFondoIndividual}
        colorFondoIndividual={colorFondoIndividual}
        setColorFondoIndividual={setColorFondoIndividual}
        quitarFondo={quitarFondo}
        setQuitarFondo={setQuitarFondo}
        handleImagenChange={handleImagenChange}
        vistaPrevia={vistaPrevia}
        cargando={cargando}
      </>

      <button type="submit" disabled={cargando}>
        {cargando ? 'Procesando...' : 'Guardar Producto'}
      </button>
    </form>
  );
}