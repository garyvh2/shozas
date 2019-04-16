import { User } from '../user';
import { ID } from '@datorama/akita';
import { TempUser } from '../external-models/tempUser';
import { RealState } from '../real-state';

export interface Review {
    id?: ID;
    date?: Date;
    comment?: string;
    rating?: number;
    userShopper: User;
    realState?: RealState;
}

export function createReview(params: Partial<Review>) {
    return {
        ...params
    } as Review;
}
