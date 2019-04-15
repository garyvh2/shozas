import { ID } from '@datorama/akita';
import { RemoveType } from '../util/remove-type';
export interface IReviewModal {
    actionMessage: string;
    id: ID;
    serviceType: RemoveType;
}
