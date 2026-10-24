import { NoticiaEntity } from './entity/NoticiaEntity';
export type * from './NewsPublicTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { NewsPublicEntityBase } from './NewsPublicEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class NewsPublicSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Noticia(entopts?: Record<string, any>): NoticiaEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): NewsPublicSDK;
    tester(testopts?: any, sdkopts?: any): NewsPublicSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof NewsPublicSDK;
export { stdutil, config, BaseFeature, NewsPublicEntityBase, NewsPublicSDK, SDK, };
export type { DirectResult };
