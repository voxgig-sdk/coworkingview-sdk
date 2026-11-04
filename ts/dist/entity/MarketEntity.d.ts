import { CoworkingviewEntityBase } from '../CoworkingviewEntityBase';
import type { CoworkingviewSDK } from '../CoworkingviewSDK';
import type { Control } from '../types';
import type { Market, MarketLoadMatch } from '../CoworkingviewTypes';
declare class MarketEntity extends CoworkingviewEntityBase<Market> {
    constructor(client: CoworkingviewSDK, entopts: any);
    make(this: MarketEntity): MarketEntity;
    load(this: any, reqmatch?: MarketLoadMatch, ctrl?: Control): Promise<MarketEntity>;
}
export { MarketEntity };
