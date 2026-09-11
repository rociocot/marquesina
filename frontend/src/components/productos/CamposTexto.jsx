import React from 'react';

export default function CamposTexto({
  nombre,
  setNombre,
  descripcion,
  setDescripcion,
  precio,
  setPrecio
}) {
  return (
    <>
      <div>
        <label>Nombre del producto:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Descripción:</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div>
        <label>Precio:</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
      </div>
    </>
  );
}