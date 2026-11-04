import { CoworkingviewEntityBase } from '../CoworkingviewEntityBase';
import type { CoworkingviewSDK } from '../CoworkingviewSDK';
import type { Control } from '../types';
import type { Property, PropertyLoadMatch, PropertyListMatch } from '../CoworkingviewTypes';
declare class PropertyEntity extends CoworkingviewEntityBase<Property> {
    constructor(client: CoworkingviewSDK, entopts: any);
    make(this: PropertyEntity): PropertyEntity;
    load(this: any, reqmatch?: PropertyLoadMatch, ctrl?: Control): Promise<PropertyEntity>;
    list(this: any, reqmatch?: PropertyListMatch, ctrl?: Control): Promise<PropertyEntity[]>;
}
export { PropertyEntity };
