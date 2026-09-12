import { MunicipalFinanceEntityBase } from '../MunicipalFinanceEntityBase';
import type { MunicipalFinanceSDK } from '../MunicipalFinanceSDK';
import type { Control } from '../types';
import type { AgedDebtor, AgedDebtorListMatch } from '../MunicipalFinanceTypes';
declare class AgedDebtorEntity extends MunicipalFinanceEntityBase<AgedDebtor> {
    constructor(client: MunicipalFinanceSDK, entopts: any);
    make(this: AgedDebtorEntity): AgedDebtorEntity;
    list(this: any, reqmatch?: AgedDebtorListMatch, ctrl?: Control): Promise<AgedDebtorEntity[]>;
}
export { AgedDebtorEntity };
