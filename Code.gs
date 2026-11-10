/**
 * Apps Script – Tablero de Avisos de Riesgo (ADR) O&M GPM
 * Pegar en Extensiones > Apps Script del Google Sheets "ADR O&M GPM - Base de datos".
 * Implementar > Nueva implementación > Aplicación web
 *   Ejecutar como: Yo · Quién tiene acceso: Cualquier usuario
 * Copiar la URL /exec en FUENTE.appsScriptUrl dentro de index.html.
 */
function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tz = ss.getSpreadsheetTimeZone();
  const leer = n => {
    const sh = ss.getSheetByName(n);
    if (!sh) return [];
    return sh.getDataRange().getValues()
      .filter((r, i) => i === 0 || r.some(c => c !== '' && c !== null))
      .map(r => r.map(c => c instanceof Date ? Utilities.formatDate(c, tz, 'yyyy-MM-dd') : c));
  };
  const out = { ADR: leer('ADR'), LISTAS: leer('Listas y criterios'), generado: new Date().toISOString() };
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
