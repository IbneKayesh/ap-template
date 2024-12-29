/***
    Author : Md. Ibne Kayesh
    License: MIT
    Version : 1.0.0
    Date: Oct - 2024
    Inpired from Bootstrap, Tailwind CSS and jQuery
 ***/

function SearchGrid(options) {
    var title = options.Title ? options.Title : '...';
    var colsName = options.ColsName.split(',');
    var colsTitle = options.ColsTitle.split(',');
    var colsHidden = options.ColsHidden ? options.ColsHidden.split(',') : [];
    var tableHeaders = colsTitle.map(function (name) {
        return `<th>${name}</th>`;
    }).join('');

    // Create modal HTML structure
    var modalHTML = `<div class="modal fade" id="dynamicModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
              <div class="modal-header table-primary">
                <h5 class="modal-title" id="modalLabel">Search result of - ${title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body table-responsive">
                    <table id="searchDataTable" class="display nowrap table-xs" style="cursor:pointer; width:100%;">
                        <thead class="table-primary">
                            <tr>
                                ${tableHeaders}
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
              </div>
              <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">Close</button>
                <button id="btnSelectClose" type="button" class="btn btn-sm btn-primary" data-dismiss="modal">Select and Close</button>
              </div>
            </div>
          </div>
        </div>
      `;
    // Append modal HTML to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Show the modal
    $('#dynamicModal').modal('show');

    // Remove the modal from the DOM when it is closed
    $('#dynamicModal').on('hidden.bs.modal', function () {
        $(this).remove();
    });

    //Hide column if it's in the hidden list
    var columns = colsName.map(function (col) {
        return {
            data: col.trim(),
            visible: !colsHidden.includes(col.trim())
        };
    });
    var table = $('#searchDataTable').DataTable({
        ajax: {
            url: options.DataUrl,
            dataSrc: '', // Adjust this if the JSON response has a nested data structure
            type: options.DataMethod,
            data: options.DataParams
        },
        columns: columns,
        paging: true,
        searching: true,
        info: true,
        autoWidth: false,
        pageLength: 10,
        select: {
            style: 'multi' // Enable multiple row selection
        },
        createdRow: function (row, data, dataIndex) {
            // Loop through each cell in the row
            $(row).find('td').each(function (cellIndex) {
                var columnName = table.settings().init().columns[cellIndex].data;
                var cellData = $(this).text();
                // Create an input element with the cell's data
                var input = $('<input>', {
                    type: 'text',
                    value: cellData,
                    class: 'editable-cell'
                });
                // Replace the cell content with the input
                $(this).empty().append(input);
            });
        },
        drawCallback: function () {
            // You might need to handle additional logic after the table is drawn
            // For example, adding event listeners to the inputs
            $('.editable-cell').on('change', function () {
                // Handle cell value change
                var newValue = $(this).val();
                console.log('Cell value changed to:', newValue);
            });
        }
    });

    // Add column definition for the extra column
    columns.push({
        data: null,
        defaultContent: '<input type="checkbox" class="form-control form-control-sm"></input>',
        orderable: false
    });

    // Handle row selection
    $('#searchDataTable tbody').on('click', 'tr', function () {
        $(this).toggleClass('selected bg-primary'); // Toggle selection
    });

    // Handle button click inside the table
    //$('#searchDataTable tbody').on('click', 'button', function () {
    //    var data = table.row($(this).closest('tr')).data();
    //    alert(data.CONTACT_NAME + "'s phone is: " + data.CONTACT_PERSON); // Adjust this alert as needed
    //});
    // Handle select and close button click
    $('#btnSelectClose').click(function () {
        var selectedData = table.rows('.selected').data().toArray();
        if (selectedData.length > 0) {
            options.onSelect(selectedData);
        }
    });
}

function FillSearchGrid(options) {
    var title = options.Title ? options.Title : '...';
    var colsName = options.ColsName.split(',');
    var colsTitle = options.ColsTitle.split(',');
    var colsHidden = options.ColsHidden ? options.ColsHidden.split(',') : [];
    var tableHeaders = colsTitle.map(function (name, index) {
        return `<th>${index === 0 ? '<input type="checkbox" id="selectAll">' : name}</th>`;
    }).join('');
    var dynData = options.DataSet;

    // Create modal HTML structure
    var modalHTML = `<div id="dynamicModal" class="modal">
                    <div class="modal-content">
                        <div class="modal-header div-border-bottom">
                            <strong class="modal-title">Search result of - ${title}</strong>
                            <span class="modal-close-btn-icon fas fa-times-circle text-template-light" data-modal-id="dynamicModal"></span>
                        </div>
                        <div class="modal-body" style="overflow-y: auto; max-height: 400px;">
                            <table id="searchDataTable" class="display nowrap table-xs" style="cursor:pointer; width:100%;">
                                <thead class="table-primary">
                                    <tr>
                                        ${tableHeaders}
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="button modal-close-btn" data-modal-id="dynamicModal"><span class="fas fa-times-circle"></span> Close</button>
                            <button id="btnSelectClose" type="button" class="button btn-green modal-ok-btn"><span class="fas fa-check-circle"></span> Select</button>
                        </div>
                    </div>
                </div>`;
    // Append modal HTML to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Show the modal
    $('#dynamicModal').fadeIn(300);

    //enable search
    $('#searchDataTable').ToTable();
    // Generate table rows dynamically    
    var table = $('#searchDataTable tbody');
    dynData.forEach(function (item) {
        var row = $('<tr></tr>');
        var checkbox = $(`<input type="checkbox" class="row-checkbox">`);
        // If MultiSelect is false, disable multiple checkbox selection
        if (!options.MultiSelect) {
            checkbox.on('click', function () {
                $('.row-checkbox').prop('checked', false); // Uncheck all checkboxes
                $(this).prop('checked', true);             // Check the clicked one
            });
        }
        row.append($('<td></td>').append(checkbox)); // Add checkbox to the first column
        //row.append('<td><input type="checkbox" class="row-checkbox"></td>'); // Add checkbox

        Object.keys(item).forEach(function (key) {
            row.append(`<td class="${colsHidden.includes(key) ? 'd-none' : ''}">${item[key]}</td>`);
        });
        table.append(row);
    });

    // Handle select all checkboxes
    $('#selectAll').on('click', function () {
        //var isChecked = $(this).is(':checked');
        //$('.row-checkbox').prop('checked', isChecked);
        if (options.MultiSelect) {
            var isChecked = $(this).is(':checked');
            $('.row-checkbox').prop('checked', isChecked);
        }
    });

    // Handle select and close button click
    $('#btnSelectClose').click(function () {
        var selectedRows = [];
        $('#searchDataTable tbody tr').each(function () {
            var checkbox = $(this).find('input.row-checkbox');
            if (checkbox.is(':checked')) {
                var rowData = {};
                $(this).find('td').each(function (index) {
                    if (index > 0) { // Skip the first column (checkbox column)
                        var key = colsName[index - 1]; // Match the data keys with index
                        var value = $(this).text().trim();
                        rowData[key] = value;
                    }
                });
                selectedRows.push(rowData);
            }
        });

        if (selectedRows.length > 0) {
            options.onSelect(selectedRows); // Pass selected data to onSelect callback
            // Close modal and remove from DOM
            $('#dynamicModal').fadeOut(300, function () {
                $('#dynamicModal').remove();
            });
        } else {
            alert('No item selected');
        }
    });

    // Close modal on clicking the close button
    $('.modal-close-btn-icon, .modal-close-btn').on('click', function () {
        $('#dynamicModal').fadeOut(300, function () {
            $('#dynamicModal').remove();
        });
    });
}