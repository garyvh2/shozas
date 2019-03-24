import { ID } from '@datorama/akita';
import { RealStateImage } from './real-state-image.model';
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
    image: RealStateImage;
}
