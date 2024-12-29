$(document).ready(() => {
    // Check if the user is logged in
    const userState = localStorage.getItem("userState");

    if (userState) {
        const user = JSON.parse(userState);
        $("#userStatus").text(`Hello, ${user.username}!`);
        $("#logoutButton").show();
    } else {
        $("#userStatus").text("You are not logged in.");
        $("#logoutButton").hide();
    }

    $("#logoutButton").on("click", () => {
        // Clear user state from localStorage
        localStorage.removeItem("userState");
        // Redirect to login page
        window.location.hash = "#/login";
    });
});