import { ID } from '@datorama/akita';

export interface User {
    id: ID;
}

export function createUser(params: Partial<User>) {
    return {} as User;
}
