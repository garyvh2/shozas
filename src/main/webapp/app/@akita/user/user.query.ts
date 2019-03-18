import { QueryEntity } from '@datorama/akita';
import { UserStore, UserState, userStore } from './user.store';
import { User } from './user.model';

export class UserQuery extends QueryEntity<UserState, User> {
    constructor(protected store: UserStore) {
        super(store);
    }
}

export const userQuery = new UserQuery(userStore);
