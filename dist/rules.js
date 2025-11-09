export const TOPIC_RE = /^[a-z0-9]+(\.[a-z0-9]+)*(\.v\d+)?$/; // dot segments, optional .vN suffix
export function isValidTopic(t) {
    return TOPIC_RE.test(t);
}
export function headerOk(h) {
    return /^x-[a-z0-9-]+$/.test(h);
} // custom headers
//# sourceMappingURL=rules.js.map