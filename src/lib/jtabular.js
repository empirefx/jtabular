const jTabular = (jsonData, view = 'horizontal', compact = []) => {
  const createTableFromData = (data, level = 0) => {
    if (!Array.isArray(data)) data = [data];

    const table = document.createElement('table');
    table.classList.add('nested-table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = new Set();
    const rows = [];

    const parseRow = (obj, row = {}, currentLevel = 0) => {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && value !== null) {
          if (Array.isArray(value)) {
            const arrayTable = createTableFromData(value, currentLevel + 1);
            const td = document.createElement('td');
            td.appendChild(arrayTable);
            row[key] = td.outerHTML;
          } else {
            row[key] = `<div class="nested-table">${createTableFromData([value], currentLevel + 1).outerHTML}</div>`;
          }
          headers.add(key);
        } else {
          row[key] = value;
          headers.add(key);
        }
      }
      rows.push(row);
    };

    data.forEach(item => parseRow(item));

    const createVerticalView = () => {
      // Create table headers
      const headerRow = document.createElement('tr');
      headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);

      // Create table rows
      rows.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
          const td = document.createElement('td');
          td.innerHTML = row[header] ?? '';
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });

      table.appendChild(thead);
      table.appendChild(tbody);
    };
    
    const createHorizontalView = () => {
      // Create table headers
      headers.forEach(header => {
      const headerRow = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
     
        // Create table rows
        rows.forEach(row => {
          const td = document.createElement('td');
          td.innerHTML = row[header] ?? '';
          headerRow.appendChild(td);
        });

        table.appendChild(headerRow);
      });
    };

    if (view === 'vertical') {
      createVerticalView();
    }else if(view === 'horizontal') {
      createHorizontalView();
    }

    return table;
  };

  return createTableFromData(jsonData);
};

export default jTabular;
