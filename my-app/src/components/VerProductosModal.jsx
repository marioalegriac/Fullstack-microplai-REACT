// src/components/VerProductosModal.jsx
import React from "react";

export default function VerProductosModal({ visible, productos, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido modal-productos">
        <div className="modal-header">
          <h2>Productos de la compra</h2>
          <button className="modal-cerrar" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {productos && productos.length > 0 ? (
            <ul>
              {productos.map((p, i) => (
                <li key={i}>
                  {p.producto_nombre} — {p.cantidad} unidades
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay productos registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
