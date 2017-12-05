let app = {
    name: "ada-template-web",
    source_path: "./src/",
    dist_path: "./dist/",
    site_url: "/",
    short_name: "ada web",
    regist_service: false,
    start_url: ".",
    display: "standalone",
    background_color: "#fff",
    theme_color: "",
    description: "A simply web template of ada.",
    main: "./src/root.js",
    entry_path: "./src/view/pages",
    icons: [
        {"src": "icons/48@2x.png", "sizes": "48x48", "type": "image/png"},
        {"src": "icons/72@2x.png", "sizes": "72x72", "type": "image/png"},
        {"src": "icons/96@2x.png", "sizes": "96x96", "type": "image/png"},
        {"src": "icons/144@2x.png", "sizes": "144x144", "type": "image/png"},
        {"src": "icons/168@2x.png", "sizes": "168x168", "type": "image/png"},
        {"src": "icons/192@2x.png", "sizes": "192x192", "type": "image/png"}
    ],
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
        regist(done) {
            done.then(reg => {
                if (reg.installing) {
                    console.log('Service worker installing');
                } else if (reg.waiting) {
                    console.log('Service worker installed');
                } else if (reg.active) {
                    console.log('Service worker active');
                }
            }).catch(e => {
                console.log('Registration failed with ' + e);
            });
        },
        oninstall(event) {
            event.waitUntil(caches.open('v1').then(function (cache) {
                return cache.addAll(["/", '/ada.js']);
            }));
        },
        onfetch(event) {
            event.respondWith(caches.match(event.request).then(function (response) {
                if (response !== undefined) {
                    return response;
                } else {
                    return fetch(event.request).then(function (response) {
                        let responseClone = response.clone();
                        caches.open('v1').then(function (cache) {
                            cache.put(event.request, responseClone);
                        });
                        return response;
                    }).catch(function () {
                        return caches.match('/sw-test/gallery/myLittleVader.jpg');
                    });
                }
            }));
        }
    },
};
export default app;