const jTabular = (jsonData, view = 'horizontal', compact = [], skip = []) => {
  if (!Array.isArray(jsonData)) jsonData = [jsonData];

  const createTableFromData = (data, deep = 0) => {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = new Set();
    const rows = [];

    if (deep !== 0) table.classList.add('nested-table');

    const parseRow = (obj, row = {}, currentDeep = 0) => {
      for (const [key, value] of Object.entries(obj)) {
        // skip selected headers
        if(skip.includes(key)) continue;

        if (typeof value === 'object' && value !== null) {
          if (Array.isArray(value)) {
            const arrayTable = createTableFromData(value, currentDeep + 1);
            const td = document.createElement('td');

            td.appendChild(arrayTable);
            row[key] = td.outerHTML;
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

    // Mixed table created at the bottom
    const mixTable = document.createElement('table');
    const mtd = document.createElement('td');
    const mtr = document.createElement('tr');

    mixTable.classList.add('mix-table');
    mtd.setAttribute('colspan', headers.size + 1); // take space left

    const mixTableView = () => {
      createHorizontalView(true); // Ensure nested tables use horizontal view
      mtd.appendChild(mixTable);
      mtr.appendChild(mtd);
      table.appendChild(mtr);
    };

    const createVerticalView = (mix = false) => {
      // Create table headers
      headers.forEach(header => {
        if(compact.includes(header)) return; // skip selected tables for mix later on

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

        // delete headers as they get append so wont re append to mixed-table
        headers.delete(header);
        table.appendChild(headerRow);
      });
    };
    
    const createHorizontalView = (mix = false) => {
      // Create table headers
      const headerRow = document.createElement('tr');

      headers.forEach(header => {
        const th = document.createElement('th');

        th.textContent = header;

        headerRow.appendChild(th);
        thead.appendChild(headerRow);
      });

      // Create table rows
      rows.forEach(row => {
        const tr = document.createElement('tr');

        headers.forEach(header => {
          const td = document.createElement('td');

          // Set mix tables at top
          if (mix || String(row[header])
            .match("nested-table")) td.setAttribute('valign', 'top');
          td.innerHTML = row[header] ?? '';

          tr.appendChild(td);
        });

        tbody.appendChild(tr);
      });

      if (mix) {
        mixTable.appendChild(thead);
        mixTable.appendChild(tbody);
      }else{
        table.appendChild(thead);
        table.appendChild(tbody);
      }
    };

    if (view === 'vertical' && deep === 0) {
      createVerticalView();
      mixTableView();
    }else{
      createHorizontalView();
    }

    return table;
  };

  return createTableFromData(jsonData);
};

export default jTabular;
