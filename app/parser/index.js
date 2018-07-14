let marked = require("marked");
let Path = require("path");
let File = require("ada-pack/base/lib/file");
let hash = require("ada-pack/base/lib/md5");
let minify = require('html-minifier').minify;

function parse(content) {
    return new Promise((resolve, reject) => {
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });
        marked(content, function (err, r) {
            if (err) {
                reject(err);
            } else {
                resolve(minify(r, {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                }));
            }
        });
    });
}

function getFiles(map) {
    let r = [];
    map.forEach(item => {
        if (item.link) {
            item.hash = hash.md5(new File(Path.resolve(__dirname, "./../../doc/", item.source)).readSync()).substring(0, 8);
            r.push(item);
        }
        if (item.list) {
            r = r.concat(getFiles(item.list));
        }
    });
    return r;
}

function output({path, distpatch}) {
    let files = {}, menu = JSON.parse(new File(Path.resolve(path, "./map.json")).readSync());
    getFiles(menu).forEach(item => {
        files[item.source] = item;
    });
    return new File(path + "/").scan().filter(path => Path.extname(path) === ".md").reduce((a, path) => {
        return a.then(() => {
            let t = "./" + Path.basename(path);
            if (files[t]) {
                return parse(new File(path).readSync()).then(content => {
                    let link = files[t].link;
                    return new File(Path.resolve(distpatch, "./" + link)).write(content);
                });
            } else {
                return Promise.resolve();
            }
        });
    }, Promise.resolve()).then(() => {
        new File(Path.resolve(__dirname, "./../src/menu.json")).write(JSON.stringify(menu));
    });
}

module.exports = {
    output() {
        console.log("");
        console.log(" [PARSE DOCS]");
        return output({
            path: Path.resolve(__dirname, "./../../doc/"),
            distpatch: Path.resolve(__dirname, "./../../dist")
        });
    }
};