import { MetaService } from './shared/meta.service';
import { FavoriteStateQuery } from './modules/listings/@akita/favorite/favorite.query';
import { FavoriteStateStore } from './modules/listings/@akita/favorite/favorite.store';
import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { ShozasSharedModule } from 'app/shared';
import { ShozasCoreModule } from 'app/core';
import { ShozasAppRoutingModule } from './app-routing.module';
import { ShozasHomeModule } from './home/home.module';
import { ShozasAccountModule } from './account/account.module';
import { ShozasEntityModule } from './entities/entity.module';
import * as moment from 'moment';
import 'moment/locale/es';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';
import { AngularMaterialModule } from 'app/shared/angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingModule } from './modules/landing/landing.module';
import { SearchRealStateStore, SearchRealStateQuery } from './modules/landing/@akita/search';
import { UserStore, UserQuery } from './@akita/user';
import { CurrencyPipe } from '@angular/common';
import { ReviewStore } from './@akita/review';
import { RecommendedStateStore } from 'app/@akita/recommended/recommended.store';
import { RecommendedStateQuery } from 'app/@akita/recommended/recommended.query';

@NgModule({
    imports: [
        BrowserModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000
        }),
        ShozasSharedModule.forRoot(),
        ShozasCoreModule,
        LandingModule,
        ShozasHomeModule,
        ShozasAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        ShozasEntityModule,
        ShozasAppRoutingModule,
        /** SHOZAS CUSTOM */
        BrowserAnimationsModule,
        AngularMaterialModule
        /** SHOZAS CUSTOM */
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        },
        UserStore,
        UserQuery,
        ReviewStore,
        SearchRealStateStore,
        SearchRealStateQuery,
        FavoriteStateStore,
        FavoriteStateQuery,
        SearchRealStateQuery,
        RecommendedStateStore,
        RecommendedStateQuery,
        CurrencyPipe,
        MetaService
    ],
    bootstrap: [JhiMainComponent]
})
export class ShozasAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
