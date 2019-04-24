import { ActivatedRoute } from '@angular/router';
import { RealStateQuery } from './../../../../@akita/real-state/real-state.query';
import { Observable } from 'rxjs';
import { RealState } from './../../../../@akita/real-state/real-state.model';
import { Component, OnInit } from '@angular/core';
import { User, UserQuery, UserService } from './../../../../@akita/user';
import { RealStateService } from 'app/@akita/real-state';

@Component({
    selector: 'jhi-external-profile',
    templateUrl: './external-profile.component.html',
    styles: []
})
export class ExternalProfileComponent implements OnInit {
    user$: Observable<User>;
    realStates$: Observable<RealState[]>;
    isLoadingRealState$: Observable<boolean>;
    constructor(
        private userService: UserService,
        private userQuery: UserQuery,
        private realStateService: RealStateService,
        private realStateQuery: RealStateQuery,
        private activeRoute: ActivatedRoute
    ) {}

    async ngOnInit() {
        this.getUser();
    }
    getUser() {
        const id = this.activeRoute.snapshot.paramMap.get('id');
        if (id) {
            this.user$ = this.userQuery.selectEntity(id);
            this.userService.get(id);
            this.user$.subscribe(user => {
                if (user) {
                    this.getUserRealState(user);
                }
            });
        }
    }
    getUserRealState(user: User) {
        this.realStates$ = this.realStateQuery.getUserRealState(user.login);
        this.isLoadingRealState$ = this.realStateQuery.selectLoading();
        this.realStateService.getUserRealState(user.login);
    }
}
