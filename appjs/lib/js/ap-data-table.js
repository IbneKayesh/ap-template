/***
    Author : Md. Ibne Kayesh
    License: MIT
    Version : 1.0.0
    Date: Oct - 2024
    Inspired from Bootstrap, Tailwind CSS and jQuery
 ***/

$(document).ready(function () {
    // table sort option
    // Event listener for sorting when a header is clicked
    $('.sortable th').on('click', function () {
        var index = $(this).index();  // Get the index of the clicked header
        var table = $(this).closest('table');  // Get the closest table
        sortTable(table, index);
    });

    // Function to sort the table
    function sortTable(table, columnIndex) {
        var rows = table.find('tbody tr').toArray();  // Get all rows in the tbody

        // Check the current sort direction
        var isAscending = table.find('th').eq(columnIndex).hasClass('asc');
        var direction = isAscending ? 1 : -1;

        // Sort rows based on the clicked column index
        rows.sort(function (a, b) {
            var aText = $(a).children('td').eq(columnIndex).text();
            var bText = $(b).children('td').eq(columnIndex).text();

            // Compare the text content of the cells in the given column
            return (aText > bText ? 1 : (aText < bText ? -1 : 0)) * direction;
        });

        // Append sorted rows back to the table
        $.each(rows, function (i, row) {
            table.find('tbody').append(row);
        });

        // Toggle the sort direction classes on the header
        table.find('th').removeClass('asc desc');
        table.find('th').eq(columnIndex).addClass(isAscending ? 'desc' : 'asc');
    }
});

$.fn.ToTable = function () {
    // Get the table and thead elements
    var table = this;
    var thead = table.find('thead');
    var tbody = table.find('tbody');

    // Create a new row in the thead to hold the search input
    var searchRow = $('<tr class="th-search-row"></tr>');

    // Get the number of columns in the table (count th elements)
    var columnCount = thead.find('th').length;

    // Add a search box that spans all columns
    var searchInput = $('<td colspan="' + columnCount + '"> <input type="text" placeholder="Search ..."> </td>');
    searchRow.append(searchInput);
    thead.append(searchRow);  // Append the search row to the thead

    // Handle the keyup event to filter the rows
    searchInput.find('input').on('keyup', function () {
        var searchText = $(this).val().toLowerCase();

        // Filter rows based on the search text
        tbody.find('tr').each(function () {
            var row = $(this);
            var showRow = false;

            // Loop through each cell in the row (excluding cells with class d-none)
            row.find('td').each(function () {
                var cellText = $(this).text().toLowerCase();
                if (cellText.indexOf(searchText) !== -1 && !$(this).hasClass('d-none')) {
                    showRow = true;
                    return false;  // If one match is found, break out of the loop
                }
            });

            // Show or hide the row based on whether a match was found
            if (showRow) {
                row.show();
            } else {
                row.hide();
            }
        });
    });
};


$.fn.ToTable1 = function () {
    const $table = this;
    const $thead = $table.find('thead');
    const $tbody = $table.find('tbody');

    // Create a row for search inputs
    const $searchRow = $('<tr></tr>').appendTo($thead);

    // Loop through each header and create a corresponding search input
    $thead.find('th').each(function (index) {
        const $th = $(this);
        if ($th.hasClass('d-none')) {
            return; // Skip hidden columns
        }
        const $input = $('<input>', {
            type: 'text',
            placeholder: `Search ${$th.text()}...`,
            // Event handler for keyup
            keyup: function () {
                const value = $(this).val().toLowerCase();
                $tbody.find('tr').filter(function () {
                    $(this).toggle($(this).find('td').eq(index).text().toLowerCase().indexOf(value) > -1);
                });
            }
        });

        // Append the input to the search row
        $('<th class="search-input"></th>').append($input).appendTo($searchRow);
    });
};