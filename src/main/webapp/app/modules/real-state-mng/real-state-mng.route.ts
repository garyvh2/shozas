import { UserRouteAccessService } from './../../core/auth/user-route-access-service';
import { RealStateMngViewComponent } from './views/real-state-mng-view/real-state-mng-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'edit/:id',
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Editar Inmueble'
        },
        canActivate: [UserRouteAccessService],
        component: RealStateMngViewComponent
    },
    {
        path: 'create',
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Crear Inmueble'
        },
        canActivate: [UserRouteAccessService],
        component: RealStateMngViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RealStateMngRoutingModule {}
