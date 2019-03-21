import { ApiResponse } from './../external-models/apiResponse.model';
import { ID } from '@datorama/akita';
import { RealStateImage } from 'app/@akita/external-models/real-state-image.model';
import { TempUser } from '../external-models/tempUser';
import RealStateType from '../external-models/real-state-type';

export interface RealState {
    id?: ID;
    latitude: number;
    longitude: number;
    province: string;
    city: string;
    district: string;
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
    realStateType: RealStateType;
    hasPool?: boolean;
    hasWater?: boolean;
    hasElectricity?: boolean;
    hasPrivateSecurity?: boolean;
    title: string;
    schools?: string[];
    hasHealthServices?: boolean;
    services?: string[];
    image?: RealStateImage;
    addr?: string;
    images?: RealStateImage;
    isSold?: boolean;
    customAmenities: string[];
    user: TempUser;
    owner: TempUser;
    dateCreated: Date;
}

export function createDetail(params: Partial<RealState>) {
    return {
        ...params
    } as RealState;
}
