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
                    path: 'landing',
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
                {
                    path: 'real-state',
                    loadChildren: './modules/real-state-mng/real-state-mng.module#RealStateMngModule'
                },
                {
                    path: 'listings',
                    loadChildren: './modules/listings/listings.module#ListingsModule'
                },
                {
                    path: 'pricing',
                    loadChildren: './modules/pricing/pricing.module#PricingModule'
                },
                ...LAYOUT_ROUTES
            ],
            { useHash: true, enableTracing: false }
        )
    ],
    exports: [RouterModule]
})
export class ShozasAppRoutingModule {}
