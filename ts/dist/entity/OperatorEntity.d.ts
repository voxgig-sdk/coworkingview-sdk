import { CoworkingviewEntityBase } from '../CoworkingviewEntityBase';
import type { CoworkingviewSDK } from '../CoworkingviewSDK';
import type { Control } from '../types';
import type { Operator, OperatorLoadMatch } from '../CoworkingviewTypes';
declare class OperatorEntity extends CoworkingviewEntityBase<Operator> {
    constructor(client: CoworkingviewSDK, entopts: any);
    make(this: OperatorEntity): OperatorEntity;
    load(this: any, reqmatch?: OperatorLoadMatch, ctrl?: Control): Promise<OperatorEntity>;
}
export { OperatorEntity };
