# Tablero de Avisos de Riesgo (ADR) · O&M GPM

Tablero web (GitHub Pages) de los Avisos de Riesgo que levanta Energía Argentina sobre el O&M del GPM. Cubre temas de seguridad y de ambiente.

Sirve para decidir, en cada ADR pendiente, si corresponde una acción inmediata o una corrección planificada. El tratamiento de cada aviso se gestiona en SAP EHSM según su tipo tgs (Anormalidad, Desvío, OPS, Incidente); el tablero da la visión de conjunto.

## Qué muestra
- **Resumen**: ADR registrados, pendientes, vencidos, cumplimiento y antigüedad de los pendientes.
- **Pendientes por vía de tratamiento**: acción inmediata, corrección planificada y respuesta por nota, ordenados por severidad (Incidente > Desvío > OPS > Anormalidad) y antigüedad. Marca "Evaluar acción inmediata" cuando un incidente o desvío con vía planificada o por nota ya superó su plazo.
- **Matriz Tipo tgs × Vía**: pendientes sobre total.
- **Gráficos**: altas y cierres por mes con la evolución de pendientes, antigüedad de pendientes por tipo, ADR por instalación y por categoría.
- **Planilla**: pendientes o todos, con buscador.

Filtros: instalación, alcance, categoría y tipo tgs.

## Archivos
- `index.html`: el tablero, en un solo archivo.
- `Code.gs`: Apps Script que expone el Google Sheets como JSON.
- `logo-tgs.png`: logo.

## Fuente de datos
Google Sheets **ADR O&M GPM - Base de datos**:
- **ADR**: una fila por aviso. Columnas: ID, ADR N° EA, Fecha detección, Instalación, Categoría, Categoría original, Condición observada, Acción solicitada por EA, Tipo tgs, Vía de tratamiento, Alcance, Estado, Responsable, Fecha cierre, Días de gestión, Situación de plazo, Observaciones tgs, Criterio de clasificación.
- **Listas y criterios**: listas desplegables, definiciones y plazo de referencia de cada vía (30 / 180 / 15 días). El tablero toma los plazos de ahí.

El tablero calcula los días de gestión y la situación de plazo por su cuenta, con la fecha del día.

## Puesta en marcha
1. En el Sheets: Extensiones > Apps Script. Pegar `Code.gs` e implementarlo como aplicación web (Ejecutar como: Yo · Acceso: Cualquier usuario). Copiar la URL `/exec`.
2. En `index.html`, completar `const FUENTE = { appsScriptUrl: "https://script.google.com/macros/s/.../exec", ... }`.
3. En GitHub: Settings > Pages > Deploy from branch `main` / root.

Si la URL de datos falla, el tablero usa la copia embebida y lo indica en el pie ("Fuente").

## Carga
- ADR nuevo: agregar una fila en **ADR** con fecha de detección, instalación, categoría, condición, tipo tgs, vía, alcance y estado "Abierto".
- Al cerrar: Estado "Realizado" y Fecha cierre.
- Si no es de O&M: Estado "No corresponde a O&M".
