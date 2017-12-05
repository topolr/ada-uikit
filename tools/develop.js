let adaSSE = require("ada-pack/sse");
let app = require("../server");
app = adaSSE(app);
app.listenDev(require("path").resolve(__dirname, "./../app/app.js"), 8080);