const Router = {
    routes: {},

    init() {
        window.addEventListener("hashchange", this.handleRoute.bind(this));
        this.handleRoute();
    },

    // add(route, handler) {
    //     this.routes[route] = handler;
    // },
    add(route, handler, requiresAuth = true) {
        this.routes[route] = async () => {
            if (requiresAuth) {
                // Check if the user is authenticated before executing the handler
                const userGlobalState = State.GlobalGet(USER_LOGIN_STATE);
                if (!userGlobalState) {
                    window.location = "/login.html"; // Redirect to login if not authenticated
                    return;
                }
            }
            handler(); // Proceed with the route handler
        };
    }, 

    handleRoute() {
        const hash = location.hash.slice(1) || "/";
        const handler = this.routes[hash];
        if (handler) {
            handler();
        } else {
            $("#app").html("<h1>404 - Page Not Found</h1>");
        }
    }
};

// Utility to load HTML and JS files dynamically
function RenderPage(htmlPath, jsPath) {
    $("#app").load(htmlPath, () => {
        if (jsPath) {
            $.getScript(jsPath);
        }
    });
}