import { MunicipalFinanceEntityBase } from '../MunicipalFinanceEntityBase';
import type { MunicipalFinanceSDK } from '../MunicipalFinanceSDK';
import type { Control } from '../types';
import type { AgedCreditor, AgedCreditorListMatch } from '../MunicipalFinanceTypes';
declare class AgedCreditorEntity extends MunicipalFinanceEntityBase<AgedCreditor> {
    constructor(client: MunicipalFinanceSDK, entopts: any);
    make(this: AgedCreditorEntity): AgedCreditorEntity;
    list(this: any, reqmatch?: AgedCreditorListMatch, ctrl?: Control): Promise<AgedCreditorEntity[]>;
}
export { AgedCreditorEntity };
