// import React from 'react';
// import Select from '../../../components/ui/Select';

// const TableSelector = ({ selectedTable, onTableChange, tables }) => {
//   const tableOptions = tables?.map(table => ({
//     value: table?.id,
//     label: `Table ${table?.number} - ${table?.status}`,
//     disabled: table?.status === 'Occupied'
//   }));

//   return (
//     <Select
//       label="Select Table (Dine-in)"
//       placeholder="Choose a table or select takeaway"
//       options={[
//         { value: 'takeaway', label: 'Takeaway Order' },
//         ...tableOptions
//       ]}
//       value={selectedTable}
//       onChange={onTableChange}
//       searchable
//     />
//   );
// };

// export default TableSelector;



import React from 'react';
import Select from '../../../components/ui/Select';

/**
 * Props expected:
 * tables = [{ id, number, status }]
 * selectedTable
 * onTableChange
 * orderItems = [{ name, qty }]
 */
const TableSelector = ({
  selectedTable,
  onTableChange,
  tables = [],
  orderItems = [],
}) => {
  const tableOptions = tables.map(table => ({
    value: table.id,
    label: `Table ${table.number} - ${table.status}`,
    disabled: table.status === 'Occupied',
  }));

  // 🔥 KOT PRINT FUNCTION
  const printKOT = () => {
    if (!orderItems.length) {
      alert('No items to print in KOT');
      return;
    }

    const kotWindow = window.open('', 'KOT', 'width=300,height=600');

    kotWindow.document.write(`
      <html>
        <head>
          <title>KOT</title>
          <style>
            body {
              font-family: monospace;
              width: 80mm;
              margin: 0;
              padding: 6px;
            }
            h2 {
              text-align: center;
              margin: 5px 0;
            }
            hr {
              border: 1px dashed #000;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 12px;
            }
            td {
              padding: 3px 0;
            }
            .center {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h2>KITCHEN ORDER TICKET</h2>
          <hr />

          <p><b>Table:</b> ${selectedTable || 'Takeaway'}</p>
          <p><b>Time:</b> ${new Date().toLocaleString()}</p>

          <hr />

          <table>
            ${orderItems
              .map(
                item => `
              <tr>
                <td>${item.name}</td>
                <td style="text-align:right;">x${item.qty}</td>
              </tr>
            `
              )
              .join('')}
          </table>

          <hr />
          <p class="center">--- END ---</p>
        </body>
      </html>
    `);

    kotWindow.document.close();
    kotWindow.focus();

    // 🖨️ Print (PDF / e-printer / real printer)
    kotWindow.print();
    kotWindow.close();
  };

  return (
    <div>
      {/* TABLE SELECT */}
      <Select
        label="Select Table (Dine-in)"
        placeholder="Choose a table or select takeaway"
        options={[
          { value: 'takeaway', label: 'Takeaway Order' },
          ...tableOptions,
        ]}
        value={selectedTable}
        onChange={onTableChange}
        searchable
      />

      {/* PRINT KOT BUTTON */}
      <button
        onClick={printKOT}
        style={{
          marginTop: '10px',
          width: '100%',
          padding: '10px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        🖨️ Print KOT
      </button>
    </div>
  );
};

export default TableSelector;
