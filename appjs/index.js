// Define Page Routes
Router.add("/business", () => {
    RenderPage("pages/company/business.html", "pages/company/business.js");
}, true); // Requires auth

Router.add("/", () => {
    RenderPage("home.html", "home.js");
}, true);

Router.add("/div-sample", () => {
    RenderPage("pages/sample/div-page.html", "");
}, false); // No auth required

Router.add("/api-test", () => {
    RenderPage("pages/apiTest/api-test.html", "pages/apiTest/api-test.js");
}, false);





// Initialize Framework
$(document).ready(() => Framework.init());

//function: 0
$(document).ready(function () {
    // Check if the user is already logged in
     const userGlobalState = State.GlobalGet(USER_LOGIN_STATE);
    // if (!userGlobalState) {
    //     // Redirect to list page if already logged in
    //     window.location = "/login.html";
    // }
    var userData = JSON.parse(userGlobalState);
    $('.navbar-user-name').text(userData.userName);
    $('.navbar-user-designation').text(userData.designation);
});

function Logout() {
    // Clear user state from localStorage
    State.GlobalRemove(USER_LOGIN_STATE);
    // Redirect to login page
    window.location = "/login.html";
}