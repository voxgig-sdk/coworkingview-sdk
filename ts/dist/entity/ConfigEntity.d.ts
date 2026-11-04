import { CoworkingviewEntityBase } from '../CoworkingviewEntityBase';
import type { CoworkingviewSDK } from '../CoworkingviewSDK';
import type { Control } from '../types';
import type { Config, ConfigLoadMatch } from '../CoworkingviewTypes';
declare class ConfigEntity extends CoworkingviewEntityBase<Config> {
    constructor(client: CoworkingviewSDK, entopts: any);
    make(this: ConfigEntity): ConfigEntity;
    load(this: any, reqmatch?: ConfigLoadMatch, ctrl?: Control): Promise<ConfigEntity>;
}
export { ConfigEntity };
