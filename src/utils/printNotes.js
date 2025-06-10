export const printNotes = (notesText) => {
  const printWindow = window.open('', '_blank');
  const styles = `
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 40px;
        color: #333;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        border-bottom: 2px solid #2C3E50;
        padding-bottom: 10px;
      }
      .logo {
        width: 80px;
        height: auto;
      }
      .date {
        font-size: 14px;
        color: #555;
      }
      h1 {
        font-size: 22px;
        color: #2C3E50;
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 15px;
      }
      .notes-container {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
      }
      .notes-content {
        font-size: 16px;
        line-height: 1.6;
        color: #333;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
        white-space: pre-wrap;
        word-wrap: break-word;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      }
      .footer {
        text-align: center;
        font-size: 12px;
        margin-top: 30px;
        color: #777;
      }
    </style>
  `;

  const date = new Date().toLocaleDateString();
  printWindow.document.write(`
    ${styles}
    <div class="header">
      <img src="https://i.ibb.co/CpM0rk4q/logo-removebg-preview.png" class="logo" alt="Logo" />
      <span class="date">Fecha: ${date}</span>
    </div>
    <h1>Mis Notas</h1>
    <div class="notes-container">
      <div class="notes-content">${notesText}</div>
    </div>
    <div class="footer">Generado automáticamente por la aplicación</div>
  `);
  printWindow.document.close();
  printWindow.print();
};
