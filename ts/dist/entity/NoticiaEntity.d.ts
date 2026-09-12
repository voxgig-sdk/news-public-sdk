import { NewsPublicEntityBase } from '../NewsPublicEntityBase';
import type { NewsPublicSDK } from '../NewsPublicSDK';
import type { Control } from '../types';
import type { Noticia, NoticiaListMatch } from '../NewsPublicTypes';
declare class NoticiaEntity extends NewsPublicEntityBase<Noticia> {
    constructor(client: NewsPublicSDK, entopts: any);
    make(this: NoticiaEntity): NoticiaEntity;
    list(this: any, reqmatch?: NoticiaListMatch, ctrl?: Control): Promise<NoticiaEntity[]>;
}
export { NoticiaEntity };
