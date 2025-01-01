const API_BASE_URL = 'http://localhost:5092/api/v1';

// Define Page Routes
Router.add("/business", () => {
    RenderPage("pages/company/business.html", "pages/company/business.js");
});
Router.add("/", () => {
    RenderPage("home.html", "home.js");
});
Router.add("/login", () => {
    RenderPage("login.html", "login.js");
});

Router.add("/div-sample", () => {
    RenderPage("pages/sample/div-page.html", "");
});



// Initialize Framework
$(document).ready(() => Framework.init());

//function: 0
$(document).ready(function () {
    // Check if the user is already logged in
    const userGlobalState = State.GlobalGet(loginState);
    if (!userGlobalState) {
        // Redirect to list page if already logged in
        window.location = "/login.html";
    }
    var userData = JSON.parse(userGlobalState);
    $('.navbar-user-name').text(userData.userName);
    $('.navbar-user-designation').text(userData.designation);
});

function Logout() {
    // Clear user state from localStorage
    State.GlobalRemove(loginState);
    // Redirect to login page
    window.location = "/login.html";
}