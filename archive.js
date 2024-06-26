document.addEventListener('DOMContentLoaded', () => {
    const csvUrl = 'https://nicolacanziani.ch/data.csv'; // Replace with your CSV file URL
    const container = document.getElementById('container');


    fetch(csvUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(csvText => {
            const lines = csvText.split('\n');
            if (lines.length === 0) return;

            const table = document.createElement('table');
            const headerCells = lines[0].split(',').map(cell => cell.trim());
            const columnCount = headerCells.length - 1;

            // Create <col> elements for each column
            for (let i = 0; i < columnCount; i++) {
                const col = document.createElement('col');
                table.appendChild(col);
            }

            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            // Add index column header
            const indexTh = document.createElement('th');
            indexRowIndex = 0;
            indexTh.textContent = '[00]'; //Index Header Name -> [00] als Alernative
            indexTh.addEventListener('click', () => sortTable(table, indexRowIndex));
            headerRow.appendChild(indexTh);

            // Add other headers (excluding the last)
            for (let i = 0; i < columnCount; i++) {
                const th = document.createElement('th');
                th.textContent = headerCells[i];
                th.dataset.columnIndex = i;
                th.addEventListener('click', () => sortTable(table, i + 1)); // +1 to account for index column
                headerRow.appendChild(th);
            }
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');

            // Process the rest of the lines
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line) { // Skip empty lines
                    const row = document.createElement('tr');
                    const values = line.split(',').map(value => value.trim().replace(/;/g, ','));

                    // Add index cell
                    const indexTd = document.createElement('td');
                    const indexNumber = (i < 10) ? `0${i}` : `${i}`;
                    indexTd.textContent = `[${indexNumber}]`;
                    row.appendChild(indexTd);

                    // Add other cells (excluding the last)
                    for (let j = 0; j < columnCount; j++) {
                        const td = document.createElement('td');
                        let value = values[j];

                        // Replace text enclosed by double asterisks with <b> elements first
                        value = value.replace(/\*\*(.*?)\*\*/g, (match, p1) => `<b>${p1}</b>`);
                        // Then replace text enclosed by single asterisks with <em> elements
                        value = value.replace(/\*(.*?)\*/g, (match, p1) => `<em>${p1}</em>`);

                        // Create a temporary div to hold the HTML structure and append it to the td
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = value;
                        while (tempDiv.firstChild) {
                            td.appendChild(tempDiv.firstChild);
                        }

                        row.appendChild(td);
                    }

                    tbody.appendChild(row);
                }
            }

            table.appendChild(tbody);
            container.appendChild(table);
        })
        .catch(error => console.error('Error fetching the CSV file:', error));

        function sortTable(table, columnIndex) {
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));

            const sortedRows = rows.sort((a, b) => {
                const aText = a.querySelector(`td:nth-child(${columnIndex + 1})`).textContent.trim();
                const bText = b.querySelector(`td:nth-child(${columnIndex + 1})`).textContent.trim();

                return aText.localeCompare(bText);
            });

            sortedRows.forEach(row => tbody.appendChild(row));
        }

});