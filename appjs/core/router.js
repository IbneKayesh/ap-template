const Router = {
    routes: {},

    init() {
        window.addEventListener("hashchange", this.handleRoute.bind(this));
        this.handleRoute();
    },
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

function RenderPage(htmlPath, jsPath) {
    $("#app").load(htmlPath, () => {
        if (jsPath) {
            $.getScript(jsPath);
        }
    });
}

function RenderComponent(element) {
    const htmlPath = element.getAttribute('data-html');
    const jsPath = element.getAttribute('data-js');
    const data = element.getAttribute('data-items');
    fetch(htmlPath)
        .then(response => response.text())
        .then(html => {
            element.innerHTML = html;
            if (jsPath) loadComponentScript(jsPath, data);
        })
        .catch(err => console.error(`Error loading HTML from ${htmlPath}:`, err));
}

function loadComponentScript(jsPath, data) {
    const relativePath = jsPath.startsWith('/') ? jsPath : `./${jsPath}`;
    import(relativePath)
        .then(module => {
            if (module && module.init) {
                module.init(data);
            }
        })
        .catch(err => console.error(`Error loading JS from ${jsPath}:`, err));
}
