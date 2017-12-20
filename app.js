let app = {
    name: "ada-template-component",
    source_path: "./src/",
    dist_path: "./dist/",
    site_url: "/",
    short_name: "ada component",
    regist_service: false,
    start_url: ".",
    display: "standalone",
    background_color: "#fff",
    theme_color: "",
    description: "A simply component template of ada.",
    main: "./src/root.js",
    icons: [],
    related_applications: [{"platform": "web"}],
    page: {
        charset: "UTF-8",
        meta: {
            viewport: "width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no",
            format_detection: "telephone=no",
            apple_mobile_web_app_status_bar_style: "white",
            apple_mobile_web_app_capable: "yes",
            theme_color: "#ffffff"
        },
        style: [],
        script: []
    },
    compiler: {
        babel: {
            presets: [["env", {
                targets: {
                    chrome: 59
                }
            }]],
            plugins: ["transform-decorators-legacy", "transform-async-to-generator", "syntax-dynamic-import"]
        },
        uglify: {},
        uglifycss: {},
        autoprefixer: {},
        sass: {},
        minifier: {}
    },
    worker: {
        scope: "/",
        beforeregist(done) {},
        oninstall(event) {},
        onfetch(event) {}
    },
};
export default app;