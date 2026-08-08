function escapeCsvValue(value) {
  const normalized = value == null ? '' : String(value);
  return `"${normalized.replaceAll('"', '""')}"`;
}

function buildDelimited(rows, columns, separator = ',') {
  const header = columns.map((column) => escapeCsvValue(column.label)).join(separator);
  const body = rows.map((row) => (
    columns.map((column) => escapeCsvValue(column.value(row))).join(separator)
  ));

  return [header, ...body].join('\r\n');
}

function downloadBlob(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function exportRowsToCsv(rows, columns, filename) {
  const csv = buildDelimited(rows, columns);
  downloadBlob(csv, filename, 'text/csv;charset=utf-8;');
}

export function exportRowsToExcel(rows, columns, filename) {
  const htmlRows = rows.map((row) => (
    `<tr>${columns.map((column) => `<td>${escapeHtml(column.value(row))}</td>`).join('')}</tr>`
  ));
  const html = `
    <html>
      <head><meta charset="UTF-8" /></head>
      <body>
        <table>
          <thead><tr>${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join('')}</tr></thead>
          <tbody>${htmlRows.join('')}</tbody>
        </table>
      </body>
    </html>
  `;

  downloadBlob(html, filename, 'application/vnd.ms-excel;charset=utf-8;');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
