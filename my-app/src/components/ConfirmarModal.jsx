import React from "react";

export default function ConfirmarModal({
  visible,
  mensaje,
  onConfirm,
  onCancel,
}) {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-confirm">
        <h3>Confirmar acción</h3>
        <p>{mensaje}</p>

        <div className="confirm-buttons">
          <button className="btn-cancelar" onClick={onCancel}>
            Cancelar
          </button>

          <button className="btn-eliminar" onClick={onConfirm}>
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
