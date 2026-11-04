import { CoworkingviewEntityBase } from '../CoworkingviewEntityBase';
import type { CoworkingviewSDK } from '../CoworkingviewSDK';
import type { Control } from '../types';
import type { Geo, GeoLoadMatch } from '../CoworkingviewTypes';
declare class GeoEntity extends CoworkingviewEntityBase<Geo> {
    constructor(client: CoworkingviewSDK, entopts: any);
    make(this: GeoEntity): GeoEntity;
    load(this: any, reqmatch?: GeoLoadMatch, ctrl?: Control): Promise<GeoEntity>;
}
export { GeoEntity };
