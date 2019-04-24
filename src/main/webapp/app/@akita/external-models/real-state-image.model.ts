import { ID } from '@datorama/akita';
export interface RealStateImage {
    _id?: ID;
    isPrimary?: boolean;
    is360Image?: boolean;
    primary?: boolean;
    source: string;
}
