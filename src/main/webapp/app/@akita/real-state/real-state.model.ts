import { ApiResponse } from './../external-models/apiResponse.model';
import { ID } from '@datorama/akita';
import { RealStateImage } from 'app/@akita/external-models/real-state-image.model';
import { TempUser } from '../external-models/tempUser';
import { RSAmenity } from '../external-models/rs-amenity';
import { RSService } from '../external-models/rs-service';

export interface RealState {
    id?: ID;
    latitude: number;
    longitude: number;
    province: string;
    city: string;
    price: number;
    description: string;
    stories: number;
    baths: number;
    beds: number;
    gar: number;
    rooms: number;
    size: number;
    garage: number;
    postalCode: string;
    realStateType: 'H' | 'L' | 'D';
    hasPool?: boolean;
    hasWater?: boolean;
    hasElectricity?: boolean;
    hasPrivateSecurity?: boolean;
    title: string;
    schools?: string[];
    hasHealthServices?: boolean;
    services?: RSService[];
    image?: RealStateImage;
    addr?: string;
    images?: RealStateImage;
    isSold?: boolean;
    customAmenities: RSAmenity[];
    user: TempUser;
    owner: TempUser;
    dateCreated: Date;
}

export function createDetail(params: Partial<RealState>) {
    return {
        ...params
    } as RealState;
}
