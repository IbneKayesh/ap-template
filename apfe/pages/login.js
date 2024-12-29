$(document).ready(() => {
    // Check if the user is already logged in
    const userState = localStorage.getItem("userState");
    if (userState) {
        // Redirect to list page if already logged in
        window.location.hash = "#/list";
    }

    $("#loginForm").on("submit", (event) => {
        event.preventDefault();

        const username = $("#username").val();
        const password = $("#password").val();

        // Simulating a login process (replace with real authentication in production)
        if (username === "admin" && password === "password") {
            const userData = { username, loggedIn: true };
            // Save user state to localStorage
            localStorage.setItem("userState", JSON.stringify(userData));

            // Redirect to the list page
            window.location.hash = "#/list";
        } else {
            $("#loginResponse").text("Invalid username or password.").addClass("error");
        }
    });
});