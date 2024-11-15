/***
    Author : Md. Ibne Kayesh
    License: MIT
    Version : 1.0.0
    Date: Oct - 2024
    Inpired from Bootstrap, Tailwind CSS and jQuery
 ***/

$(document).ready(function () {




    // Select all input elements of type file
    $('input[type="file"]').each(function () {
        const defaultLabel = $(this).next('label').text(); // Get the label text next to the input
        $(this).on('change', function () {
            const fileName = this.files.length > 0 ? this.files[0].name : defaultLabel; // Get the selected file name
            $(this).next('label').text(fileName); // Update the corresponding label text
        });
    });

    //tab content
    $('.tab-links a').on('click', function (e) {
        e.preventDefault();

        // Remove active class from all tabs and hide content
        $('.tab-links li').removeClass('active');
        $('.tab').removeClass('active');

        // Add active class to the clicked tab and show content
        $(this).parent().addClass('active');
        $($(this).attr('href')).addClass('active');
    });
    // Close tab functionality
    $('.close-tab').on('click', function (e) {
        e.stopPropagation(); // Prevent click event from bubbling up

        var tab = $(this).parent();
        var contentId = tab.find('a').attr('href');

        // Remove the tab and its content
        tab.remove();
        $(contentId).remove();

        // If the closed tab was active, activate the first available tab
        if (tab.hasClass('active')) {
            $('.tab-links li:first-child').addClass('active');
            $('.tab:first-child').addClass('active');
        }
    });



    //table sort option
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



    // Toggle the expandable rows when the arrow is clicked
    $('.divtab-row-column.divtab-toggle').on('click', function () {
        // Get the expandable rows for the clicked row
        var expandableRows = $(this).closest('.divtab-row').next('.divtab-expandable-rows');
        // Toggle the expanded/collapsed state
        expandableRows.slideToggle(200);
        // Toggle the expanded class on the header for arrow rotation
        $(this).toggleClass('expanded');
    });
});
// Function to add a new tab

const TabPage = {
    addTab: function (tabName) {
        var tabCount = $('.tab-links li').length + 1;
        var newTabId = 'tab' + tabCount;

        // Create new tab and content
        $('.tab-links').append('<li><a href="#' + newTabId + '">Tab ' + tabName + '</a> <span class="close-tab tab-button fas fa-times"></span></li>');
        $('.tab-content').append('<div id="' + newTabId + '" class="tab"><h2>Content for Tab ' + tabName + '</h2><p>This is the body content for Tab ' + tabName + '.</p></div>');

        // Add click event for new tab
        $('.tab-links a:last').on('click', function (e) {
            e.preventDefault();
            $('.tab-links li').removeClass('active');
            $('.tab').removeClass('active');
            $(this).parent().addClass('active');
            $($(this).attr('href')).addClass('active');
        });

        // Add click event for close button
        $('.close-tab:last').on('click', function (e) {
            e.stopPropagation();
            var tab = $(this).parent();
            var contentId = tab.find('a').attr('href');
            tab.remove();
            $(contentId).remove();
            if (tab.hasClass('active')) {
                $('.tab-links li:first-child').addClass('active');
                $('.tab:first-child').addClass('active');
            }
        });
    }
};

// Create the notification container
const notificationContainer = $('<div id="notification-container"></div>').appendTo('body');
// Create the overlay
const overlay = $('<div class="overlay"></div>').appendTo('body').hide();
const Popup = {
    Show: function (type, message) {
        const icon = type === 'success' ? 'fas fa-check' :
                     type === 'error' ? 'fas fa-times' :
                     type === 'info' ? 'fas fa-info-circle' :
                     type === 'warn' ? 'fas fa-exclamation-triangle' : '';

        const notification = $('<div class="notification"></div>')
            .addClass(type)
            .html(`<i class="${icon} icon-button"></i> ${message}`)
            .appendTo(notificationContainer)
            .fadeIn(300)
            .delay(40000)
            .fadeOut(300, function () {
                $(this).remove();
            });
    },
    Confirm: function (message, yesCallback, noCallback) {
        // Show the overlay
        overlay.show();
        const confirmDialog = $('<div class="confirm-dialog"></div>')
            .html(`<p>${message}</p>`)
            .append('<button class="button btn-green btn-confirm-yes"><span class="far fa-check-circle"></span> Yes</button>')
            .append('<button class="button btn-red btn-confirm-no"style="float: right;"><span class="far fa-times-circle"></span> No</button>')
            .appendTo(notificationContainer)
            .fadeIn(300);

        // Center the dialog
        confirmDialog.css({
            position: 'fixed',
            top: '50%',
            left: '50%',
            bottom: '39%',
            transform: 'translate(-50%, -50%)'
        });

        // Handle button clicks
        confirmDialog.find('.btn-confirm-yes').click(function () {
            yesCallback();
            // Hide the overlay
            overlay.hide();
            confirmDialog.fadeOut(300, function () {
                $(this).remove();
            });
        });

        confirmDialog.find('.btn-confirm-no').click(function () {
            noCallback();
            overlay.hide(); // Hide the overlay
            confirmDialog.fadeOut(300, function () {
                $(this).remove();
            });
        });
    }
};


// Function to show the modal
function showPopupModal() {
    $('#modal').fadeIn(300);
}

// Function to hide the modal
function hidePopupModal() {
    $('#modal').fadeOut(300);
}
$('.modal-close-btn').on('click', function () {
    hidePopupModal();
});
$('.modal-ok-btn').on('click', function () {
    hidePopupModal();
});
$('.modal-close-btn-icon').on('click', function () {
    hidePopupModal();
});
$.fn.ToTable = function () {
    const $table = this;
    const $thead = $table.find('thead');
    const $tbody = $table.find('tbody');

    // Create a row for search inputs
    const $searchRow = $('<tr></tr>').appendTo($thead);

    // Loop through each header and create a corresponding search input
    $thead.find('th').each(function (index) {
        const $th = $(this);
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

//function sortTable(n) {
//    const table = this.closest('table'); // Use 'this' to get the closest table element
//    const rows = Array.from(table.rows).slice(1); // Exclude header row
//    const isAscending = table.rows[0].cells[n].classList.contains("asc");
//    const direction = isAscending ? 1 : -1;

//    // Sort the rows based on the column index (n)
//    rows.sort((a, b) => {
//        const aText = a.cells[n].textContent || a.cells[n].innerText;
//        const bText = b.cells[n].textContent || b.cells[n].innerText;
//        return (aText > bText ? 1 : aText < bText ? -1 : 0) * direction;
//    });

//    // Append the sorted rows back to the table body
//    rows.forEach(row => table.querySelector("tbody").appendChild(row));

//    // Toggle class to keep track of the current sort direction
//    table.querySelectorAll("th").forEach(th => th.classList.remove("asc", "desc"));
//    table.rows[0].cells[n].classList.toggle(isAscending ? "desc" : "asc");
//}


var WorkInProgress = {
    Show: function (message) {
        var overlay = `
            <div id='loading-overlay' class="loading-overlay">
                <div class="spinner"></div>
                <p class="loading-text">${message}</p>
            </div>
        `;

        $('body').append(overlay);
        $('#loading-overlay').show();
    },
    Hide: function () {
        $('#loading-overlay').remove();
    }
};
