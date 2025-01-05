//function: 0
$(document).ready(function () {
    // Check if the user is already logged in
    const userGlobalState = State.GlobalGet(USER_LOGIN_STATE);
    if (userGlobalState) {
        // Redirect to list page if already logged in
        window.location = "/";
    }
});


//function: 1
function PageGoClear(action) {
    switch (action) {
        case 'page-login':
            $('#login-email').val('');
            $('#login-pass').val('');

            break;

        default:
            console.log('Invalid action');
            break;
    }
}

//function: 2
function PageGoValidateInput(action) {
    let isValid = true;
    let newDataCollection = {};
    switch (action) {
        case 'div-page-login':
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
            isValid = true; //it should be false
            newDataCollection = {
                emailAddress: loginemail.value.trim(),
                loginPass: password.value.trim(),
                userName: 'Kayesh',
                designation: 'Developer',
                loggedIn: true
            };

            break;

        default:
            console.log('Invalid action');
            break;
    }
    return { isValid, newDataCollection };
}

//function: 3
function PageGoFillInput(action, dynData) {
    switch (action) {
        case 'home-page':
            //do action
            break;

        default:
            console.log('Invalid action');
            break;
    }
}

//function: 4
function GenerateTableHTML(action, dynData) {
    switch (action) {
        case 'home-page':
            //do action
            break;

        default:
            console.log('Invalid action');
            break;
    }
}

//function: 5
function PageGoNext(action, dataid) {
    switch (action) {
        case 'div-page-login':
            $('#div-page-login').addClass('active');
            $('#div-page-register').removeClass('active');
            $('#div-page-forgot').removeClass('active');
            $('#div-page-otp').removeClass('active');
            $('#div-page-otp-resend').removeClass('active');

            break;

        case 'div-page-register':
            $('#div-page-login').removeClass('active');
            $('#div-page-register').addClass('active');
            $('#div-page-forgot').removeClass('active');
            $('#div-page-otp').removeClass('active');
            $('#div-page-otp-resend').removeClass('active');

            break;

        case 'div-page-otp':
            $('#div-page-login').removeClass('active');
            $('#div-page-register').removeClass('active');
            $('#div-page-forgot').removeClass('active');
            $('#div-page-otp').addClass('active');
            $('#div-page-otp-resend').removeClass('active');

            break;

        case 'div-page-otp-resend':
            $('#div-page-login').removeClass('active');
            $('#div-page-register').removeClass('active');
            $('#div-page-forgot').removeClass('active');
            $('#div-page-otp').removeClass('active');
            $('#div-page-otp-resend').addClass('active');

            break;

        case 'div-page-forgot':
            $('#div-page-login').removeClass('active');
            $('#div-page-register').removeClass('active');
            $('#div-page-forgot').addClass('active');
            $('#div-page-otp').removeClass('active');
            $('#div-page-otp-resend').removeClass('active');

            break;
        default:
            console.log('Invalid action');
            break;
    }
}

//function: 6
function PageGoActionEvent(action, dataid) {
    switch (action) {
        case 'div-page-login':
            var validationSummary = PageGoValidateInput("div-page-login");
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
                //             PageGoClear('logi-page-name');
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

                //Save user state to globalStorage            
                State.GlobalSet(USER_LOGIN_STATE, validationSummary.newDataCollection);
                State.GlobalSet(API_AUTH_APP_TOKEN, "a10");

                //user defined keys
                State.GlobalSet(KEY_USER_ID,'kayesh');
                State.GlobalSet(KEY_USER_KEY,'asp.net');
                // Redirect to the list page
                window.location = "/";
                //window.location.reload();
            } else {
                Popup.Show("error", "Request submission is failed, Fix errors and try again!");
            }

            break;

        default:
            console.log('Invalid action');
            break;
    }
}

//function: 7
function PageGoShowModal(action, dataid) {
    switch (action) {
        case 'home-page':
            //do action
            break;

        default:
            console.log('Invalid action');
            break;
    }
}




function showError(input, errorElement, message) {
    input.parentElement.classList.add('invalid');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}
function clearError(input, errorElement) {
    input.parentElement.classList.remove('invalid');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}