const pageName = "loginhtml";

//function: 0
$(document).ready(function () {
    // Check if the user is already logged in
    const userGlobalState = State.GlobalGet(pageName);
    if (userGlobalState) {
        // Redirect to list page if already logged in
        window.location.hash = "#/";
    }
});


//function: 1
function PageGoClear(action) {
    if (action === 'page-login') {
        $('#login-email').val('');
        $('#login-pass').val('');
    }
}

//function: 2
function PageGoValidateInput(action) {
    let isValid = true;
    let newDataCollection = {};
    if (action == "user-login") {
        const loginemail = document.getElementById('login-email');
        const loginemailError = document.getElementById('login-email-error');
        if (loginemail.value.trim() === '') {
            showError(loginemail, loginemailError, 'Email is required');
            isValid = false;
        } else {
            clearError(loginemail, loginemailError);
        }

        // Validate password
        const password = document.getElementById('login-pass');
        const passwordError = document.getElementById('login-pass-error');
        if (password.value.trim() === '') {
            showError(password, passwordError, 'Password is required');
            isValid = false;
        } else {
            clearError(password, passwordError);
        }

        const designation = 'Developer';
        newDataCollection = {
            emailAddress: loginemail.value.trim(),
            loginPass: password.value.trim(),
            designation: designation,
            loggedIn: true
        };
    }
    return { isValid, newDataCollection };
}

//function: 3
function PageGoFillInput(action, dynData) {
    if (action === 'home-page') {
    }
}

//function: 4
function GenerateTableHTML(action, dynData) {
    if (action === 'home-page') {
    }
}

//function: 5
function PageGoNext(action, dataid) {
    if (action === 'div-page-login') {
        $('#div-page-login').addClass('active');
        $('#div-page-register').removeClass('active');
        $('#div-page-forgot').removeClass('active');
        $('#div-page-otp').removeClass('active');
        $('#div-page-otp-resend').removeClass('active');
    }
    else if (action === 'div-page-register') {
        $('#div-page-login').removeClass('active');
        $('#div-page-register').addClass('active');
        $('#div-page-forgot').removeClass('active');
        $('#div-page-otp').removeClass('active');
        $('#div-page-otp-resend').removeClass('active');
    }
    else if (action === 'div-page-otp') {
        $('#div-page-login').removeClass('active');
        $('#div-page-register').removeClass('active');
        $('#div-page-forgot').removeClass('active');
        $('#div-page-otp').addClass('active');
        $('#div-page-otp-resend').removeClass('active');
    }
    else if (action === 'div-page-otp-resend') {
        $('#div-page-login').removeClass('active');
        $('#div-page-register').removeClass('active');
        $('#div-page-forgot').removeClass('active');
        $('#div-page-otp').removeClass('active');
        $('#div-page-otp-resend').addClass('active');
    }
    else if (action === 'div-page-forgot') {
        $('#div-page-login').removeClass('active');
        $('#div-page-register').removeClass('active');
        $('#div-page-forgot').addClass('active');
        $('#div-page-otp').removeClass('active');
        $('#div-page-otp-resend').removeClass('active');
    }
    else {
        console.log('Invalid action');
    }
}

//function: 6
function PageGoActionEvent(action, dataid) {
    if (action === 'user-login') {
        var validationSummary = PageGoValidateInput("user-login");
        if (validationSummary.isValid) {
            // $('#btn-UserLogin').html("Please wait...").prop("disabled", true);
            // $.ajax({
            //     url: '/api/v1/users/user_login',
            //     type: 'POST',
            //     contentType: 'application/json',
            //     data: JSON.stringify(validationSummary.newDataCollection),
            //     success: function (data, status, xhr) {
            //         var parsedData = JSON.parse(data);
            //         if (parsedData.SUCCESS) {
            //             //clear form
            //             PageGoClear('page-login');
            //             //redirect to home page
            //             window.location.href = '/Vendors/VendorProfile/Home';
            //             Popup.Show("success", "Welcome to e-Tender!");
            //         } else {
            //             Popup.Show("error", parsedData.MESSAGE);
            //         }
            //     },
            //     error: function (xhr) {
            //         Popup.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText);
            //     },
            //     complete: function (xhr, status) {
            //         $('#btn-UserLogin').html("Login").prop("disabled", false);
            //     }
            // });

            // Save user state to globalStorage            
            State.GlobalSet(pageName, validationSummary.newDataCollection);
            // Redirect to the list page
            window.location = "/";
            //window.location.reload();
            console.log('a');
        } else {
            Popup.Show("error", "Request submission is failed, Fix errors and try again!");
        }
    }
}

//function: 7
function PageGoShowModal(action, dataid) {
    if (action === 'home-page') {

    }
}