import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { User } from './user.model';

export interface UserState extends EntityState<User> {}

@Injectable()
@StoreConfig({ name: 'user' })
export class UserStore extends EntityStore<UserState, User> {
    constructor() {
        super();
    }
}

export const userStore = new UserStore();
