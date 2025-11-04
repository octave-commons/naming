"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOPIC_RE = void 0;
exports.isValidTopic = isValidTopic;
exports.headerOk = headerOk;
exports.TOPIC_RE = /^[a-z0-9]+(\.[a-z0-9]+)*(\.v\d+)?$/; // dot segments, optional .vN suffix
function isValidTopic(t) {
    return exports.TOPIC_RE.test(t);
}
function headerOk(h) {
    return /^x-[a-z0-9-]+$/.test(h);
} // custom headers
