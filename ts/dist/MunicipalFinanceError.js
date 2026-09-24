"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MunicipalFinanceError = void 0;
class MunicipalFinanceError extends Error {
    isMunicipalFinanceError = true;
    sdk = 'MunicipalFinance';
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
exports.MunicipalFinanceError = MunicipalFinanceError;
//# sourceMappingURL=MunicipalFinanceError.js.map