"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fs_1 = require("node:fs");
var node_os_1 = require("node:os");
var node_path_1 = require("node:path");
var ava_1 = require("ava");
var index_js_1 = require("../index.js");
(0, ava_1.default)("alias rewrite", function (t) {
    var r = (0, index_js_1.mkAliasRewriter)("@old", "@new-");
    t.is(r("@old/logger"), "@new-logger");
    t.is(r("@old/utils/path/to/x"), "@new-utils/path/to/x");
    t.is(r("lodash"), null);
});
(0, ava_1.default)("relative -> .js", function (t) {
    var dir = (0, node_fs_1.mkdtempSync)((0, node_path_1.join)((0, node_os_1.tmpdir)(), "alias-"));
    var from = (0, node_path_1.join)(dir, "src/a.ts");
    (0, node_fs_1.mkdirSync)((0, node_path_1.join)(dir, "src"), { recursive: true });
    (0, node_fs_1.writeFileSync)(from, "");
    (0, node_fs_1.writeFileSync)((0, node_path_1.join)(dir, "src/b.ts"), "");
    var f = (0, index_js_1.mkRelativeToJs)(from);
    t.is(f("./b"), "./b.js");
});
(0, ava_1.default)("folder -> index.js if present", function (t) {
    var dir = (0, node_fs_1.mkdtempSync)((0, node_path_1.join)((0, node_os_1.tmpdir)(), "alias-"));
    var from = (0, node_path_1.join)(dir, "src/a.ts");
    (0, node_fs_1.mkdirSync)((0, node_path_1.join)(dir, "src/foo"), { recursive: true });
    (0, node_fs_1.writeFileSync)(from, "");
    (0, node_fs_1.writeFileSync)((0, node_path_1.join)(dir, "src/foo/index.ts"), "");
    var f = (0, index_js_1.mkRelativeToJs)(from);
    t.is(f("./foo"), "./foo/index.js");
});
