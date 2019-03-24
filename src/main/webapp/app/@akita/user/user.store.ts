import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from './user.model';

export interface UserState extends EntityState<User> {}

@StoreConfig({ name: 'user' })
export class UserStore extends EntityStore<UserState, User> {
    constructor() {
        super();
    }
}

export const userStore = new UserStore();
