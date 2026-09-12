import { AgedCreditorEntity } from './entity/AgedCreditorEntity';
import { AgedDebtorEntity } from './entity/AgedDebtorEntity';
import { FactEntity } from './entity/FactEntity';
export type * from './MunicipalFinanceTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { MunicipalFinanceEntityBase } from './MunicipalFinanceEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class MunicipalFinanceSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    AgedCreditor(entopts?: Record<string, any>): AgedCreditorEntity;
    AgedDebtor(entopts?: Record<string, any>): AgedDebtorEntity;
    Fact(entopts?: Record<string, any>): FactEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): MunicipalFinanceSDK;
    tester(testopts?: any, sdkopts?: any): MunicipalFinanceSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof MunicipalFinanceSDK;
export { stdutil, config, BaseFeature, MunicipalFinanceEntityBase, MunicipalFinanceSDK, SDK, };
