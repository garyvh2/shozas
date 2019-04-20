import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactivateUserViewComponent } from './views/reactivate-user-view/reactivate-user-view.component';
import { ReactivateUserRoutingModule } from './reactivate-user.route';
import { ShozasSharedModule } from 'app/shared';
import { ReactivateUserService } from './reactivate-user.service';

@NgModule({
    declarations: [ReactivateUserViewComponent],
    imports: [ShozasSharedModule, ReactivateUserRoutingModule],
    exports: [],
    providers: [ReactivateUserService]
})
export class ReactivateUserModule {}
