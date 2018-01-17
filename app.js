let app = {
    name: "ada-template-component",
    source_path: "./src/",
    dist_path: "./dist/",
    description: "A simply component template of ada.",
    main: "./src/root.js",
    compiler: {
        babel: {
            presets: [
                "@babel/typescript", ["@babel/env", {"targets": {"chrome": "60"}}]
            ]
        }
    }
};
export default app;