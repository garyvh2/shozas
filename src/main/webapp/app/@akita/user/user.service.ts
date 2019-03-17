import { ID } from '@datorama/akita';
import { UserStore, userStore } from './user.store';

export class UserService {
    constructor(private userStore: UserStore) {}
}

export const userService = new UserService(userStore);
