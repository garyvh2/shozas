import { ID } from '@datorama/akita';
import { TempUser } from '../external-models/tempUser';

export interface Review {
    id: ID;
    date: Date;
    comment: string;
    stars: number;
    user: TempUser;
    realStateId: ID;
}

export function createReview(params: Partial<Review>) {
    return {
        ...params
    } as Review;
}
