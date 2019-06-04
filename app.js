let app = {
    name: "test",
    siteURL: "/",
    sourcePath: "./src/",
    distPath: "./dist/",
    indexPath: "./dist/index.html",
    entryPath: "./src/test/",
    main: "./src/entries/root.js",
    staticPath: "./src/static",
    baseInfo: {
        name: "test",
        description: "test",
        icons: [],
        charset: "UTF-8",
        meta: [
            { name: 'viewport', content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" },
            { name: 'format_detection', content: "telephone=no" },
            { name: 'apple_mobile_web_app_status_bar_style', content: "white" },
            { name: 'apple_mobile_web_app_capable', content: "yes" }
        ]
    }
};
module.exports = app;