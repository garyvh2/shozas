import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from './app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    loadChildren: './modules/landing/landing.module#LandingModule'
                },
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#ShozasAdminModule'
                },

                {
                    path: 'detail',
                    loadChildren: './modules/detail/detail.module#DetailModule'
                },
                ...LAYOUT_ROUTES
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class ShozasAppRoutingModule {}
