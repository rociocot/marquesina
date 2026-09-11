import React from 'react';

export default function OpcionesFondo({
  colorTarjeta,
  setColorTarjeta,
  generarNuevoColor,
  tipoFondoIndividual,
  setTipoFondoIndividual,
  colorFondoIndividual,
  setColorFondoIndividual,
  quitarFondo,
  setQuitarFondo,
  handleImagenChange,
  vistaPrevia,
  cargando
}) {
  return (
    <>
      <div>
        <h3>Color de Tarjeta (Vista Agrupada)</h3>
        <input
          type="color"
          value={colorTarjeta}
          onChange={(e) => setColorTarjeta(e.target.value)}
        />
        <button type="button" onClick={generarNuevoColor}>
          Aleatorio
        </button>
        <p>Este color se usará en las placas con 3 productos.</p>
      </div>

      <div>
        <h3>Fondo de la Vista Individual</h3>
        <label>
          <input
            type="radio"
            name="tipoFondoIndividual"
            value="IMAGEN"
            checked={tipoFondoIndividual === 'IMAGEN'}
            onChange={() => setTipoFondoIndividual('IMAGEN')}
          />
          Foto / Imagen
        </label>

        <label>
          <input
            type="radio"
            name="tipoFondoIndividual"
            value="COLOR"
            checked={tipoFondoIndividual === 'COLOR'}
            onChange={() => setTipoFondoIndividual('COLOR')}
          />
          Color Plano
        </label>

        {tipoFondoIndividual === 'COLOR' && (
          <div>
            <label>Color de Fondo:</label>
            <input
              type="color"
              value={colorFondoIndividual}
              onChange={(e) => setColorFondoIndividual(e.target.value)}
            />
          </div>
        )}
      </div>

      {tipoFondoIndividual === 'IMAGEN' && (
        <div>
          <h3>Imagen del Producto</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
          />

          <label>
            <input
              type="checkbox"
              checked={quitarFondo}
              onChange={(e) => setQuitarFondo(e.target.checked)}
            />
            Quitar fondo automáticamente (IA)
          </label>

          {cargando && <p>Procesando imagen...</p>}

          {vistaPrevia && (
            <div>
              <p>Vista previa del producto:</p>
              <img
                src={vistaPrevia}
                alt="Vista previa del producto"
                style={{ maxWidth: '300px' }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}