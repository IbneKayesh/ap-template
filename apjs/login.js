/***
    Author : Md. Ibne Kayesh
    License: MIT
    Version : 1.0.0
    Date: Oct - 2024
    Inspired from Bootstrap, Tailwind CSS and jQuery
 ***/
const pageName = "loginhtml";
//function: 0
$(document).ready(function () {
    Cookies.set(pageName, 'user', { expires: 1 });

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
    if (action === 'login-page') {
        $('#div-page-login').addClass('active');
        $('#div-page-register').removeClass('active');
        $('#div-page-forgot').removeClass('active');
        $('#div-page-otp').removeClass('active');
        $('#div-page-otp-resend').removeClass('active');
    }
    else if (action === 'register-page') {
        $('#div-page-login').removeClass('active');
        $('#div-page-register').addClass('active');
        $('#div-page-forgot').removeClass('active');
        $('#div-page-otp').removeClass('active');
        $('#div-page-otp-resend').removeClass('active');
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
        } else {
            Popup.Show("error", "Request submission is failed, Fix errors and try again!");
        }
    }
}


function ValidatePageInput(actionname) {
    let isValid = true;
    let newDataCollection = {};

    if (actionname == "user-register") {
        const vendorname = document.getElementById('register-vendorname');
        const vendornameError = document.getElementById('register-vendorname-error');
        if (vendorname.value.trim() === '') {
            showError(vendorname, vendornameError, 'Vendor Name is required');
            isValid = false;
        } else {
            clearError(vendorname, vendornameError);
        }
        const yourname = document.getElementById('register-yourname');
        const yournameError = document.getElementById('register-yourname-error');
        if (yourname.value.trim() === '') {
            showError(yourname, yournameError, 'Your Name is required');
            isValid = false;
        } else {
            clearError(yourname, yournameError);
        }

        const loginemail = document.getElementById('register-email');
        const loginemailError = document.getElementById('register-email-error');
        if (loginemail.value.trim() === '') {
            showError(loginemail, loginemailError, 'Login Email is required');
            isValid = false;
        } else {
            clearError(loginemail, loginemailError);
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(loginemail.value)) {
            showError(loginemail, loginemailError, 'Invalid Email Address');
            isValid = false;
        }


        const loginpass = document.getElementById('register-pass');
        const loginpassError = document.getElementById('register-pass-error');
        if (loginpass.value.trim() === '') {
            showError(loginpass, loginpassError, 'Password is required');
            isValid = false;
        } else {
            clearError(loginpass, loginpassError);
        }
        newDataCollection = {
            vendorName: vendorname.value.trim(),
            userName: yourname.value.trim(),
            emailAddress: loginemail.value.trim(),
            loginPassword: loginpass.value.trim()
        };
    }
    else if (actionname == "verify-otp") {
        const verifyotpemail = document.getElementById('verify-otp-email');
        const verifyotpemailError = document.getElementById('verify-otp-email-error');
        if (verifyotpemail.value.trim() === '') {
            showError(verifyotpemail, verifyotpemailError, 'Email is required');
            isValid = false;
        } else {
            clearError(verifyotpemail, verifyotpemailError);
        }
        const verifyotpno = document.getElementById('verify-otp-no');
        const verifyotpnoError = document.getElementById('verify-otp-no-error');
        if (verifyotpno.value.trim() === '') {
            showError(verifyotpno, verifyotpnoError, 'OTP is required');
            isValid = false;
        } else {
            clearError(verifyotpno, verifyotpnoError);
        }
        newDataCollection = {
            emailAddress: verifyotpemail.value.trim(),
            otpNo: verifyotpno.value.trim()
        };
    }
    else if (actionname == "resend-otp") {
        const otpregisteremail = document.getElementById('otp-register-email');
        const otpregisteremailError = document.getElementById('otp-register-email-error');
        if (otpregisteremail.value.trim() === '') {
            showError(otpregisteremail, otpregisteremailError, 'Email is required');
            isValid = false;
        } else {
            clearError(otpregisteremail, otpregisteremailError);
        }
        newDataCollection = {
            emailAddress: otpregisteremail.value.trim()
        };
    }
    return { isValid, newDataCollection };
}


function ClearDivPage(action) {
    if (action === 'page-register') {
        $('#register-vendorname').val('');
        $('#register-yourname').val('');
        $('#register-email').val('');
        $('#register-pass').val('');
    }
    else if (action === 'page-otp') {
        $('#register-verify-otp-email').val('');
        $('#register-verify-otp-n').val('');
    }
    else if (action === 'div-page-otp-resend') {
        $('#otp-register-email').val('');
    }
}



function ActionEvent(action, dataid) {
    if (action === 'user-register') {
        var validationSummary = ValidatePageInput("user-register");
        if (validationSummary.isValid) {
            $('#btn-SaveNewVendorUser').html("Please wait...").prop("disabled", true);
            $.ajax({
                url: '/api/v1/Vendors/new_vendor_user',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(validationSummary.newDataCollection),
                success: function (data, status, xhr) {
                    var parsedData = JSON.parse(data);
                    if (parsedData.SUCCESS) {
                        alert('A verification code has been sent to your email address (' + validationSummary.newDataCollection.emailAddress + '). Please enter the OTP below to verify your account.');
                        $('#verify-otp-email').val(validationSummary.newDataCollection.emailAddress);
                        //clear form
                        ClearDivPage('page-register');
                        NextView('otp-page', '0');
                    } else {
                        Popup.Show("error", parsedData.MESSAGE);
                    }
                },
                error: function (xhr) {
                    Popup.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText);
                },
                complete: function (xhr, status) {
                    $('#btn-SaveNewVendorUser').html("Register").prop("disabled", false);
                }
            });

        } else {
            Popup.Show("error", "Request submission is failed, Fix errors and try again!");
        }
    }
    else if (action === 'verify-otp') {
        var validationSummary = ValidatePageInput("verify-otp");
        if (validationSummary.isValid) {
            $('#btn-VerifyOTP').html("Please wait...").prop("disabled", true);
            $.ajax({
                url: '/api/v1/Vendors/new_vendor_user_otp_verify',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(validationSummary.newDataCollection),
                success: function (data, status, xhr) {
                    var parsedData = JSON.parse(data);
                    if (parsedData.SUCCESS) {
                        Popup.Show("success", "Your email address has been verified. You can now access your account.");
                        //clear form
                        ClearDivPage('page-otp');
                        NextView('login-page', '0');
                    } else {
                        Popup.Show("error", parsedData.MESSAGE);
                    }
                },
                error: function (xhr) {
                    Popup.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText);
                },
                complete: function (xhr, status) {
                    $('#btn-VerifyOTP').html("Verify").prop("disabled", true);
                }
            });

        } else {
            Popup.Show("error", "Request submission is failed, Fix errors and try again!");
        }
    }
    else if (action === 'resend-otp') {
        var validationSummary = ValidatePageInput("resend-otp");
        if (validationSummary.isValid) {
            $('#btn-resend-otp').html("Please wait...").prop("disabled", true);
            $.ajax({
                url: '/api/v1/Vendors/new_user_resend_otp',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(validationSummary.newDataCollection),
                success: function (data, status, xhr) {
                    var parsedData = JSON.parse(data);
                    if (parsedData.SUCCESS) {
                        alert('A verification code has been sent to your email address (' + validationSummary.newDataCollection.emailAddress + '). Please enter the OTP below to verify your account.');
                        $('#verify-otp-email').val(validationSummary.newDataCollection.emailAddress);
                        //clear form
                        ClearDivPage('div-page-otp-resend');
                        NextView('otp-page', '0');
                    } else {
                        Popup.Show("error", parsedData.MESSAGE);
                    }
                },
                error: function (xhr) {
                    Popup.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText);
                },
                complete: function (xhr, status) {
                    $('#btn-resend-otp').html("Verify").prop("disabled", true);
                }
            });

        } else {
            Popup.Show("error", "Request submission is failed, Fix errors and try again!");
        }
    }
}










