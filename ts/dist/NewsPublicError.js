"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsPublicError = void 0;
class NewsPublicError extends Error {
    isNewsPublicError = true;
    sdk = 'NewsPublic';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.NewsPublicError = NewsPublicError;
//# sourceMappingURL=NewsPublicError.js.map