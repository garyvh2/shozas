import { FavoritesComponent } from './views/favorites/favorites.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: 'favorites',
        component: FavoritesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Settings'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListingsRoutingModule {}
