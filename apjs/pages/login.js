$(document).ready(() => {


    $("#loginForm").on("submit", (event) => {
        event.preventDefault();

        const username = $("#username").val();
        const password = $("#password").val();

        // Simulating a login process (replace with real authentication in production)
        if (username === "admin" && password === "1") {
            
        } else {
            Popup.Show("error", "User or Password is invalid");
        }
    });
});
