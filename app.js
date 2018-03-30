let app = {
    name: "ada-template-component",
    source_path: "./src/",
    dist_path: "./dist/",
    description: "A simply component template of ada.",
    main: "./src/entries/root.js",
    ada_autobundle: false,
    compiler: {
        babel: {
            presets: [
                "@babel/typescript", ["@babel/env", {"targets": {"chrome": "60"}}]
            ]
        }
    }
};
export default app;