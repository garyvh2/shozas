import { ID } from '@datorama/akita';
import { RealStateImage } from '../external-models/real-state-image.model';
import UserType from '../external-models/user-type';
import { Review } from '../review';

export interface User {
    id: ID;
    firstName: string;
    name?: string;
    userImage?: string;
    image: RealStateImage;
    imageUrl: string;
    lastName: string;
    login: string;
    phone: number;
    raiting: number;
    stars?: number;
    userId: string;
    userType: UserType;
    activated: boolean;
    displayPhone: boolean;
    favorites: string[];
    reviews: Review[];
}

export function createUser(params: Partial<User>) {
    return {} as User;
}
