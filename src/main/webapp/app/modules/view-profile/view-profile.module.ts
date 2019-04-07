import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './../../core';
import { RealStateQuery } from './../../@akita/real-state';
import { RealStateService } from './../../@akita/real-state/real-state.service';
import { ShozasSharedModule } from './../../shared/shared.module';
import { OwnProfileComponent } from './views/own-profile/own-profile.component';
import { ExternalProfileComponent } from './views/external-profile/external-profile.component';
import { ViewProfileRoutingModule } from './view-profile.route';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { RealStateListComponent } from './components/real-state-list/real-state-list.component';
import { StarRatingModule } from 'angular-star-rating';
@NgModule({
    declarations: [OwnProfileComponent, ExternalProfileComponent, UserInfoComponent, RealStateListComponent],
    imports: [CommonModule, ViewProfileRoutingModule, ShozasSharedModule, StarRatingModule.forRoot()],
    providers: [RealStateService, RealStateQuery, AccountService]
})
export class ViewProfileModule {}
