// Function to export the table to an Excel file, with an option to include or exclude rows with 'd-none' class
function WriteToXLS(tableId, filename, includeHidden = false) {
    try {
        var table = document.getElementById(tableId);
        // Check if the table has at least one row in the tbody
        if (table.querySelector('tbody') && table.querySelector('tbody').rows.length < 1) {
            alert("The table has no rows to export.");
            return;
        }

        var html = "<table border='1'>";

        // Loop through each row of the table
        for (var i = 0; i < table.rows.length; i++) {
            // If 'includeHidden' is false and the row has the 'd-none' class, skip this row
            if (!includeHidden && table.rows[i].classList.contains('d-none')) {
                continue;
            }

            html += "<tr>";
            var cells = table.rows[i].cells;

            // Loop through each cell of the row
            for (var j = 0; j < cells.length; j++) {
                html += "<td>" + cells[j].innerText + "</td>";
            }
            html += "</tr>";
        }
        html += "</table>";

        // Create an Excel-compatible Blob
        var blob = new Blob([html], { type: "application/vnd.ms-excel" });

        // Create a temporary link element to trigger the download
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename || "table-data.xls";
        link.click();
    } catch (e) {
        alert(e);
    }
}

// Function to read CSV file and fill the HTML table with data, including the <thead> from the first row
function ReadCSV(inputElement, tableId) {
    try {
        const file = inputElement.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            const rows = content.split("\n");

            // Get the table and tbody elements
            const table = document.getElementById(tableId);
            const tbody = table.getElementsByTagName("tbody")[0];
            const thead = table.getElementsByTagName("thead")[0];

            tbody.innerHTML = '';  // Clear any existing rows

            // Create the <thead> row from the first row of CSV (header)
            const headerRow = rows[0].split(",");
            const theadTr = document.createElement("tr");
            headerRow.forEach(header => {
                const th = document.createElement("th");
                th.textContent = header.trim();  // Remove any extra spaces
                theadTr.appendChild(th);
            });

            // Append the header row to the <thead>
            thead.innerHTML = '';  // Clear any existing headers
            thead.appendChild(theadTr);

            // Loop through the rest of the CSV rows and create table rows (<tr>)
            rows.slice(1).forEach(row => {
                const cells = row.split(",");

                // Create a new table row
                const tr = document.createElement("tr");

                // Loop through each cell in the row
                cells.forEach(cell => {
                    const td = document.createElement("td");
                    td.textContent = cell.trim();  // Remove any extra spaces
                    tr.appendChild(td);
                });

                // Append the row to the table body
                tbody.appendChild(tr);
            });
        };

        reader.onerror = function (e) {
            console.error("Error reading file", e);
        };

        // Read the file as text (CSV)
        reader.readAsText(file);
    } catch (e) {
        alert(e);
    }
}


// Function to generate CSV from HTML table
function WriteCSV1(tableId, filename) {
    const table = document.getElementById(tableId);
    let csv = '';

    // Get the table headers (thead)
    const headers = table.getElementsByTagName('thead')[0];
    const headerCells = headers ? headers.getElementsByTagName('th') : [];

    // Loop through each header and add to CSV
    for (let i = 0; i < headerCells.length; i++) {
        csv += '"' + headerCells[i].textContent.trim() + '"'; // Adding quotes to handle commas in headers
        if (i < headerCells.length - 1) {
            csv += ','; // Separate headers with a comma
        }
    }
    csv += '\n'; // Newline after header row

    // Get the table rows (tbody)
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    // Loop through each row and extract the cell data
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');

        // Loop through each cell in the row
        for (let j = 0; j < cells.length; j++) {
            csv += '"' + cells[j].textContent.trim() + '"'; // Add quotes to handle commas in cells
            if (j < cells.length - 1) {
                csv += ','; // Separate cells with a comma
            }
        }
        csv += '\n'; // Newline after each row
    }

    // Create a Blob from the CSV string and download the file
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename || "table-data.csv";
    link.click();
}
function WriteCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    let csv = '';

    // Get the table headers (thead)
    const headers = table.getElementsByTagName('thead')[0];
    const headerCells = headers ? headers.getElementsByTagName('th') : [];

    // Loop through each header and add to CSV
    for (let i = 0; i < headerCells.length; i++) {
        csv += '"' + headerCells[i].textContent.trim() + '"'; // Adding quotes to handle commas in headers
        if (i < headerCells.length - 1) {
            csv += ','; // Separate headers with a comma
        }
    }
    csv += '\n'; // Newline after header row

    // Get the table rows (tbody)
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    // Loop through each row and extract the cell data
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');

        // Loop through each cell in the row
        let rowData = [];
        for (let j = 0; j < cells.length; j++) {
            // Skip cells with the "d-none" class
            if (cells[j].classList.contains('d-none')) {
                continue;
            }

            // Add the cell value to the rowData array
            rowData.push('"' + cells[j].textContent.trim() + '"'); // Add quotes to handle commas in cells
        }

        // Join the row data into a single string, separating columns by commas
        if (rowData.length > 0) {
            csv += rowData.join(',') + '\n'; // Newline after each row
        }
    }

    // Create a Blob from the CSV string and download the file
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename || "table-data.csv";
    link.click();
}


// Function to convert HTML table rows into an array
function TableToArray(tableId) {
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    const data = [];

    // Loop through each row
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const rowData = [];

        // Loop through each cell in the row
        for (let j = 0; j < cells.length; j++) {
            rowData.push(cells[j].textContent.trim()); // Get the text content of each cell
        }

        data.push(rowData); // Push the row data to the array
    }

    return data;
}

// Function to convert HTML table to JSON array
function TableToJson(tableId) {
    const table = document.getElementById(tableId);
    const headers = [];
    const rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    const data = [];

    // Get headers from the first row of the table (thead)
    const headerCells = table.getElementsByTagName("thead")[0].getElementsByTagName("th");
    for (let i = 0; i < headerCells.length; i++) {
        headers.push(headerCells[i].textContent.trim());
    }

    // Loop through each row in the tbody
    for (let i = 0; i < rows.length; i++) {
        const rowData = {};
        const cells = rows[i].getElementsByTagName("td");

        // Loop through each cell in the row
        for (let j = 0; j < cells.length; j++) {
            // Use the header as the key for each cell
            rowData[headers[j]] = cells[j].textContent.trim();
        }

        // Push row data into the JSON array
        data.push(rowData);
    }

    return data;
}
