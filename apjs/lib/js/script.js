/***
    Author : Md. Ibne Kayesh
    License: MIT
    Version : 1.0.0
    Date: Oct - 2024
    Inspired from Bootstrap, Tailwind CSS and jQuery
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

    //// Toggle the expandable rows when the arrow is clicked
    //$('.divtab-row-column.divtab-toggle').on('click', function () {
    //    // Get the expandable rows for the clicked row (this will expand only the immediate next level)
    //    var expandableRows = $(this).closest('.divtab-row').next('.divtab-expandable-rows');

    //    // Toggle the expanded/collapsed state for the targeted expandable rows
    //    expandableRows.slideToggle(200);

    //    // Toggle the expanded class on the header for arrow rotation
    //    $(this).toggleClass('expanded');

    //    // Collapse any deeper levels (levels beyond the immediate next one)
    //    expandableRows.find('.divtab-expandable-rows').slideUp(200);
    //    expandableRows.find('.divtab-row-column.divtab-toggle').removeClass('expanded');
    //});


    // On click of parent row
    $(document).on('click', '.parent-row', function () {
        var className = $(this).data('class'); // Get the unique class name
        // Toggle visibility of related rows
        $('.' + className).toggle();
        // Toggle arrow icon
        $(this).find('.table-row-arrow i').toggleClass('fa-chevron-down fa-chevron-up');
    });
});

$(document).on('click', '.divtab-row-column.divtab-toggle', function () {
    var expandableRows = $(this).closest('.divtab-row').next('.divtab-expandable-rows');

    // Slide toggle for the relevant expandable row
    expandableRows.slideToggle(200);

    // Toggle the arrow icon direction (down/up)
    $(this).find('.divtab-arrow i').toggleClass('fa-chevron-down fa-chevron-up');

    // Toggle the expanded class for visual feedback
    $(this).toggleClass('expanded');

    // Optional: Close any nested expandable rows within the current expandable row
    expandableRows.find('.divtab-expandable-rows').slideUp(200);
    expandableRows.find('.divtab-row-column.divtab-toggle').removeClass('expanded');
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


// Function to show the modal
function showPopupModal(modalId) {
    $(`#${modalId}`).fadeIn(300);
}

// Function to hide the modal
function hidePopupModal(modalId) {
    $(`#${modalId}`).fadeOut(300);
}

// Event handlers for close and ok buttons
$(document).on('click', '.modal-close-btn, .modal-ok-btn, .modal-close-btn-icon', function () {
    const modalId = $(this).data('modal-id');
    $(`#${modalId}`).fadeOut(300);
});

var WorkInProgress_v1 = {
    Show: function (message) {
        var overlay = `
            <div id='loading-overlay' class="loading-overlay">
                <div class="spinner"></div>
                <p class="loading-text">${message}</p>
            </div>
        `;
        $('body').append(overlay);
        $('#loading-overlay').fadeIn(550);
    },
    Hide: function () {
        $('#loading-overlay').fadeOut(750, function () {
            $(this).remove();
        });
    }
};

var WorkInProgress = (function () {
    let activeRequests = 0; // Track active AJAX requests
    return {
        Show: function (message) {
            if (activeRequests === 0) {
                var overlay = `
                    <div id='loading-overlay' class="loading-overlay">
                        <div class="spinner"></div>
                        <p class="loading-text">${message}</p>
                    </div>
                `;
                $('body').append(overlay);
                $('#loading-overlay').fadeIn(550);
            }
            activeRequests++; // Increment active requests count
        },

        Hide: function () {
            activeRequests--; // Decrement active requests count
            if (activeRequests <= 0) {
                activeRequests = 0; // Ensure it doesn’t go negative
                $('#loading-overlay').fadeOut(750, function () {
                    $(this).remove();
                });
            }
        }
    };
})();



// Update the countdown every second
setInterval(EventEndDateTime, 1000);
// Update the countdown every second
function EventEndDateTime() {
    $('.end-date-time').each(function () {
        var eventEndTime = $(this).data('end-date-time');
        var eventEndDate = new Date(eventEndTime);
        var now = new Date();
        var diff = eventEndDate - now;
        var countdown = eventEndTime;
        if (diff > 0) {
            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);
            var countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            $(this).addClass("text-red");
            countdown = FormatStringToDateTime(eventEndTime);
        }        
        $(this).text(countdown);
    });
}


//for chrome web browser
function FormatStringToDateOnly(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    var day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function FormatStringToDateTime(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var hours = date.getHours();
    var minutes = String(date.getMinutes()).padStart(2, '0');
    var seconds = String(date.getSeconds()).padStart(2, '0');
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
}

//Generate key like Guid
function GenerateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}


// get query parameters
function GetQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}