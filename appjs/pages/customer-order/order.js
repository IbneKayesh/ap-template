// //function: 0
 $(document).ready(function () {
    // Initialize components
    // Select all custom div elements
    const components = document.querySelectorAll('ap-items,ap-payment,ap-shipment');
    components.forEach(RenderComponent);
});

// // This function will be responsible for loading HTML and JS for each div
// function loadComponent(element) {
//     const htmlPath = element.getAttribute('data-html');
//     const jsPath = element.getAttribute('data-js');
//     const data = element.getAttribute('data-items')

//     // Load HTML content dynamically
//     fetch(htmlPath)
//         .then(response => response.text())
//         .then(html => {
//             element.innerHTML = html;
//             //loadScript(jsPath);  // Once HTML is loaded, load the JS
//             if (jsPath) loadScript(jsPath, data);
//         })
//         .catch(err => console.error(`Error loading HTML from ${htmlPath}:`, err));
// }

// // // This function will load the JS file dynamically
// function loadScript(jsPath, data) {
//     // Use a relative path to load the module
//     const relativePath = jsPath.startsWith('/') ? jsPath : `./${jsPath}`;

//     import(relativePath)
//         .then((module) => {
//             if (module && module.init) {
//                 module.init(data);  // Assuming each module has an init function that accepts data
//             }
//         })
//         .catch(err => console.error(`Error loading script from ${jsPath}:`, err));
// }