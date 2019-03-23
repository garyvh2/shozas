import { ID } from '@datorama/akita';
export interface TempUser {
    id?: ID;
    login: string;
    name?: String;
    firstName: string;
    lastName: string;
    stars?: number;
    userImage?: string;
    raiting?: number;
    owner: string;
    phone: number;
    email: string;
}
