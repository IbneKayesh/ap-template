/***
    Author : Md. Ibne Kayesh
    License: MIT
    Version : 1.0.0
    Date: Oct - 2024
    Inpired from Bootstrap, Tailwind CSS and jQuery
 ***/

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

        const notification = $('<div class="notification" onclick="ClosePopup(this);"></div>')
            .addClass(type)
            .html(`<i class="${icon} icon-button"></i> ${message}`)
            .appendTo(notificationContainer)
            .fadeIn(300)
            .delay(4000)
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
//Click notification to close immediately
function ClosePopup(e) {
    $(e).remove();
}