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
                    path: 'profile',
                    loadChildren: './modules/view-profile/view-profile.module#ViewProfileModule'
                },
                {
                    path: 'pricing',
                    loadChildren: './modules/pricing/pricing.module#PricingModule'
                },
                {
                    path: 'reactivate',
                    loadChildren: './modules/reactivate-user/reactivate-user.module#ReactivateUserModule'
                },
                ...LAYOUT_ROUTES
            ],
            { useHash: true, enableTracing: false, onSameUrlNavigation: 'reload' }
        )
    ],
    exports: [RouterModule]
})
export class ShozasAppRoutingModule {}
