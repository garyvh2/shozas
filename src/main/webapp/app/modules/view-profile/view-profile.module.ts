import { UserService } from './../../@akita/user/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './../../core';
import { RealStateQuery } from './../../@akita/real-state';
import { RealStateService } from './../../@akita/real-state/real-state.service';
import { ShozasSharedModule } from './../../shared/shared.module';
import { OwnProfileComponent } from './views/own-profile/own-profile.component';
import { ExternalProfileComponent } from './views/external-profile/external-profile.component';
import { ViewProfileRoutingModule } from './view-profile.route';
import { StarRatingModule } from 'angular-star-rating';
import { UserQuery } from './../../@akita/user/index';
import { ReviewsModalComponent } from './components/reviews-modal/reviews-modal.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
@NgModule({
    declarations: [OwnProfileComponent, ExternalProfileComponent, ReviewsModalComponent, UserInfoComponent],
    entryComponents: [ReviewsModalComponent],
    imports: [CommonModule, ViewProfileRoutingModule, ShozasSharedModule, StarRatingModule.forRoot()],
    providers: [RealStateService, RealStateQuery, AccountService, UserService, UserQuery]
})
export class ViewProfileModule {}
