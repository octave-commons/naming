"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkRelativeToJs = exports.isRelative = exports.mkAliasRewriter = void 0;
var node_fs_1 = require("node:fs");
var node_path_1 = require("node:path");
var mkAliasRewriter = function (fromPrefix, toPrefix) {
    if (fromPrefix === void 0) { fromPrefix = "@old"; }
    if (toPrefix === void 0) { toPrefix = "@new-"; }
    return function (spec) {
        if (!spec.startsWith(fromPrefix))
            return null;
        var rest = spec.slice(fromPrefix.length).replace(/^\/+/, "");
        if (rest.length === 0)
            return "__ALIAS_REWRITE_ERROR__ROOT_IMPORT__";
        var _a = rest.split("/"), folder = _a[0], tail = _a.slice(1);
        if (!folder)
            return "__ALIAS_REWRITE_ERROR__BAD_SEGMENT__";
        var newLeft = "".concat(toPrefix).concat(folder);
        return __spreadArray([newLeft], tail, true).join("/");
    };
};
exports.mkAliasRewriter = mkAliasRewriter;
var isRelative = function (s) {
    return s.startsWith("./") || s.startsWith("../");
};
exports.isRelative = isRelative;
var hasExt = function (s) { return /\.[a-z]+$/i.test(s); };
var toJs = function (s) {
    return /\.[mc]?tsx?$/.test(s) ? s.replace(/\.[mc]?tsx?$/i, ".js") : "".concat(s, ".js");
};
var tryIndex = function (absNoExt) {
    var idx = (0, node_path_1.join)(absNoExt, "index");
    var exts = [".ts", ".tsx", ".mts", ".cts", ".js", ".mjs", ".cjs"];
    var hit = exts.find(function (e) { return (0, node_fs_1.existsSync)(idx + e); });
    return hit ? toJs(idx) : null;
};
var mkRelativeToJs = function (fromFile) {
    return function (spec) {
        if (!(0, exports.isRelative)(spec) || hasExt(spec))
            return spec;
        var baseDir = (0, node_path_1.dirname)(fromFile);
        var absNoExt = (0, node_path_1.join)(baseDir, spec);
        var exts = [".ts", ".tsx", ".mts", ".cts", ".js", ".mjs", ".cjs"];
        var fileHit = exts.find(function (e) { return (0, node_fs_1.existsSync)(absNoExt + e); });
        if (fileHit)
            return toJs(spec);
        var idx = tryIndex(absNoExt);
        if (idx)
            return "".concat(spec.replace(/\/+$/, ""), "/index.js");
        return "".concat(spec, ".js");
    };
};
exports.mkRelativeToJs = mkRelativeToJs;
