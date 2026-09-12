import { Context } from './Context';
declare class NewsPublicError extends Error {
    isNewsPublicError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { NewsPublicError };
