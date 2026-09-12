import { MunicipalFinanceEntityBase } from '../MunicipalFinanceEntityBase';
import type { MunicipalFinanceSDK } from '../MunicipalFinanceSDK';
import type { Control } from '../types';
import type { Fact, FactListMatch } from '../MunicipalFinanceTypes';
declare class FactEntity extends MunicipalFinanceEntityBase<Fact> {
    constructor(client: MunicipalFinanceSDK, entopts: any);
    make(this: FactEntity): FactEntity;
    list(this: any, reqmatch?: FactListMatch, ctrl?: Control): Promise<FactEntity[]>;
}
export { FactEntity };
