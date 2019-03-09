import { ID } from '@datorama/akita';

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
}

export function createDetail(params: Partial<Detail>) {
    return {
        ...params
    } as Detail;
}
