import React from 'react';

export default function OpcionesFondo({ 
  colorTarjeta, setColorTarjeta, 
  posicionTexto, setPosicionTexto,
  colorTexto, setColorTexto,
  fuenteSeleccionada, setFuenteSeleccionada 
}) {
  const fuentesDisponibles = [
    { nombre: 'Moderna (Sans-Serif)', valor: 'Arial, sans-serif' },
    { nombre: 'Elegante (Serif)', valor: 'Georgia, serif' },
    { nombre: 'Tecnológica (Monospace)', value: 'Courier New, monospace' },
    { nombre: 'Impactante (Arial Black)', valor: 'Arial Black, sans-serif' },
    { nombre: 'Redondeada (Comic Sans/Casual)', valor: 'Verdana, sans-serif' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#171717', padding: '16px', borderRadius: '8px', border: '1px solid #262626' }}>
      <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#e5e5e5', margin: 0 }}>Diseño y Estilo de la Tarjeta</h3>

      {/* Color de Fondo*/}
      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '0.8rem', color: '#a3a3a3' }}>Color de fondo:</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="color" 
              value={colorTarjeta} 
              onChange={(e) => setColorTarjeta(e.target.value)}
              style={{ width: '36px', height: '32px', border: 'none', background: 'none', cursor: 'pointer' }} 
            />
            <span style={{ fontSize: '0.85rem', color: '#fff' }}>{colorTarjeta}</span>
          </div>
        </div>
      </div>

      {/* Selector de Color de Texto y Fuente */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '0.8rem', color: '#a3a3a3' }}>Color del texto (Global):</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="color" 
              value={colorTexto} 
              onChange={(e) => setColorTexto(e.target.value)}
              style={{ width: '36px', height: '32px', border: 'none', background: 'none', cursor: 'pointer' }} 
            />
            <span style={{ fontSize: '0.85rem', color: '#fff' }}>{colorTexto}</span>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '0.8rem', color: '#a3a3a3' }}>Tipografía (Fuente):</label>
          <select 
            value={fuenteSeleccionada} 
            onChange={(e) => setFuenteSeleccionada(e.target.value)}
            style={{ padding: '6px', backgroundColor: '#262626', color: '#fff', border: '1px solid #404040', borderRadius: '4px', fontSize: '0.85rem' }}
          >
            {fuentesDisponibles.map((f, idx) => (
              <option key={idx} value={f.valor}>{f.nombre}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}