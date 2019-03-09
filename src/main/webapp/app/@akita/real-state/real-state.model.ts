import { ID } from '@datorama/akita';
import { RealStateImage } from 'app/@akita/external-models/real-state-image.model';

export interface Detail {
    id?: ID;
    latitude: number;
    longitude: number;
    province: string;
    city: string;
    price: number;
    description: string;
    stories: number;
    baths: number;
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
    services?: string[];
    images?: RealStateImage;
    isSold?: boolean;
    customAmenities: string[];
}

export function createDetail(params: Partial<Detail>) {
    return {
        ...params
    } as Detail;
}
