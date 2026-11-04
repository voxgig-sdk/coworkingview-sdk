import { CoworkingviewEntityBase } from '../CoworkingviewEntityBase';
import type { CoworkingviewSDK } from '../CoworkingviewSDK';
import type { Control } from '../types';
import type { Facet, FacetLoadMatch } from '../CoworkingviewTypes';
declare class FacetEntity extends CoworkingviewEntityBase<Facet> {
    constructor(client: CoworkingviewSDK, entopts: any);
    make(this: FacetEntity): FacetEntity;
    load(this: any, reqmatch?: FacetLoadMatch, ctrl?: Control): Promise<FacetEntity>;
}
export { FacetEntity };
