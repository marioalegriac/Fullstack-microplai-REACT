// src/TablaDinamica.jsx
import React, { useMemo, useState, useEffect } from "react";
import VerProductosModal from "./components/VerProductosModal";

function TablaDinamica({
  tipo,
  data,
  columns,
  filtroTexto,
  setFiltroTexto,
  sortDefault,
  onGestionar,
  onEliminar,
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // ✅ Modal Ver Más
  const [modalVisible, setModalVisible] = useState(false);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const filasPorPagina = 10;
  const [pagina, setPagina] = useState(1);

  // ✅ Seteo automático del orden inicial por tipo de tabla
  useEffect(() => {
    if (sortDefault) setSortConfig(sortDefault);
    setPagina(1);
  }, [sortDefault, tipo]);

  // ✅ ORDEN POR CLICK EN HEADERS
  const handleSort = (key) => {
    const col = columns.find((c) => c.key === key);
    if (!col || !col.sortable) return;

    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  // ✅ FLECHAS DE ORDEN
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  // ✅ FILTRO + ORDEN
  const resultadoFinal = useMemo(() => {
    if (!Array.isArray(data)) return [];

    let resultado = [...data];

    // FILTRO
    if (filtroTexto.trim() !== "") {
      const texto = filtroTexto.toLowerCase();
      resultado = resultado.filter((fila) =>
        columns.some((col) => {
          const valor = fila[col.key];
          if (valor == null) return false;
          return String(valor).toLowerCase().includes(texto);
        })
      );
    }

    // ORDEN
    if (sortConfig.key) {
      const col = columns.find((c) => c.key === sortConfig.key);
      if (!col) return resultado;

      const sortKey = col.sortKey || sortConfig.key;

      resultado.sort((a, b) => {
        let aVal = a[sortKey];
        let bVal = b[sortKey];

        // Fechas
        if (sortKey === "fecha" || sortKey === "fechaFormateada") {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }

        // Precios CLP
        if (typeof aVal === "string" && aVal.includes("CLP")) {
          aVal = Number(aVal.replace(/[.\sCLP]/g, ""));
          bVal = Number(bVal.replace(/[.\sCLP]/g, ""));
        }

        // Numéricos
        if (col.isNumeric) {
          return sortConfig.direction === "asc"
            ? Number(aVal) - Number(bVal)
            : Number(bVal) - Number(aVal);
        }

        // Strings
        const as = String(aVal ?? "").toLowerCase();
        const bs = String(bVal ?? "").toLowerCase();

        if (as < bs) return sortConfig.direction === "asc" ? -1 : 1;
        if (as > bs) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return resultado;
  }, [data, filtroTexto, sortConfig, columns]);

  // ✅ PAGINACIÓN
  const datosPaginados = useMemo(() => {
    const inicio = (pagina - 1) * filasPorPagina;
    return resultadoFinal.slice(inicio, inicio + filasPorPagina);
  }, [resultadoFinal, pagina]);

  const totalFilas = resultadoFinal.length;
  const mostrarAcciones = !!(onGestionar || onEliminar);

  return (
    <div className="tabla-dinamica">
      {/* BUSCADOR */}
      <div className="admin-filtros">
        <label>Buscar:</label>
        <input
          type="text"
          placeholder="Nombre, correo, consola, total…"
          value={filtroTexto}
          onChange={(e) => {
            setFiltroTexto(e.target.value);
            setPagina(1);
          }}
        />
      </div>

      {/* TABLA */}
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={col.sortable ? "sortable" : ""}
                onClick={() => handleSort(col.key)}
              >
                {col.label}{" "}
                {col.sortable && (
                  <span className="orden-indicador">
                    {getSortIndicator(col.key)}
                  </span>
                )}
              </th>
            ))}

            {tipo === "compras" && <th>Ver</th>}
            {mostrarAcciones && <th>Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {datosPaginados.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 2}>
                No hay datos para mostrar.
              </td>
            </tr>
          ) : (
            datosPaginados.map((fila) => (
              <tr key={fila.id}>
                {columns.map((col) => (
                  <td key={col.key}>{fila[col.key]}</td>
                ))}

                {/* ✅ COLUMNA VER MÁS */}
                {tipo === "compras" && (
                  <td>
                    <button
                      className="btn-gestionar"
                      onClick={() => {
                        setProductosSeleccionados(fila.productosRaw || []);
                        setModalVisible(true);
                      }}
                    >
                      Ver más
                    </button>
                  </td>
                )}

                {mostrarAcciones && (
                  <td>
                    {onGestionar && (
                      <button
                        className="btn-gestionar"
                        onClick={() => onGestionar(fila)}
                      >
                        Gestionar
                      </button>
                    )}

                    {onEliminar && (
                      <button
                        className="btn-eliminar"
                        onClick={() => onEliminar(fila.id)}
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* PAGINACIÓN */}
      <div className="paginacion">
        <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}>
          ⬅ Anterior
        </button>

        <span>Página {pagina}</span>

        <button
          onClick={() => setPagina(pagina + 1)}
          disabled={pagina * filasPorPagina >= totalFilas}
        >
          Siguiente ➡
        </button>
      </div>

      {/* ✅ MODAL VER PRODUCTOS */}
      <VerProductosModal
        visible={modalVisible}
        productos={productosSeleccionados}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}

export default TablaDinamica;
