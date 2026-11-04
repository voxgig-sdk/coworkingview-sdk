import { CoworkingviewEntityBase } from '../CoworkingviewEntityBase';
import type { CoworkingviewSDK } from '../CoworkingviewSDK';
import type { Control } from '../types';
import type { Place, PlaceLoadMatch } from '../CoworkingviewTypes';
declare class PlaceEntity extends CoworkingviewEntityBase<Place> {
    constructor(client: CoworkingviewSDK, entopts: any);
    make(this: PlaceEntity): PlaceEntity;
    load(this: any, reqmatch?: PlaceLoadMatch, ctrl?: Control): Promise<PlaceEntity>;
}
export { PlaceEntity };
