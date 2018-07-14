let parser = require("./parser/index");
let app = {
    name: "ada-template-web",
    site_url:"/",
    source_path: "./src/",
    dist_path: "./../dist/",
    index_path: "./../dist/index.html",
    description: "A simply web template of ada.",
    main: "./src/root.js",
    entry_path: "./src/entries/",
    ada_autobundle: false,
    icons: [
        {"src": "icons/48@2x.png", "sizes": "48x48", "type": "image/png"},
        {"src": "icons/72@2x.png", "sizes": "72x72", "type": "image/png"},
        {"src": "icons/96@2x.png", "sizes": "96x96", "type": "image/png"},
        {"src": "icons/144@2x.png", "sizes": "144x144", "type": "image/png"},
        {"src": "icons/168@2x.png", "sizes": "168x168", "type": "image/png"},
        {"src": "icons/192@2x.png", "sizes": "192x192", "type": "image/png"}
    ],
    server: {
        port: 8080
    },
    onbeforebundle() {
        return parser.output();
    }
};
module.exports = app;