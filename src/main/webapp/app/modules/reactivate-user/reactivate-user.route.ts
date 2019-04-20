import { UserRouteAccessService } from './../../core/auth/user-route-access-service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactivateUserViewComponent } from './views/reactivate-user-view/reactivate-user-view.component';

const routes: Routes = [
    {
        path: '',
        data: {
            pageTitle: 'Reactivar Usuario'
        },
        canActivate: [UserRouteAccessService],
        component: ReactivateUserViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReactivateUserRoutingModule {}
