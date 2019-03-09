import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMaterialModule } from './angular-material/angular-material.module';

@NgModule({
    imports: [NgbModule.forRoot(), InfiniteScrollModule, CookieModule.forRoot(), FontAwesomeModule, AngularMaterialModule],
    exports: [FormsModule, CommonModule, NgbModule, NgJhipsterModule, InfiniteScrollModule, FontAwesomeModule, AngularMaterialModule]
})
export class ShozasSharedLibsModule {
    static forRoot() {
        return {
            ngModule: ShozasSharedLibsModule
        };
    }
}
