import { UserRouteAccessService } from './../../core/auth/user-route-access-service';
import { OwnProfileComponent } from './views/own-profile/own-profile.component';
import { ExternalProfileComponent } from './views/external-profile/external-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        // data: {
        //     authorities: ['ROLE_USER'],
        //     pageTitle: 'Editar Inmueble'
        // },
        // canActivate: [UserRouteAccessService],
        component: OwnProfileComponent
    },
    {
        path: 'user/:id',
        component: ExternalProfileComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewProfileRoutingModule {}
