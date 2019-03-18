import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShozasSharedModule } from 'app/shared';

import {
    PasswordStrengthBarComponent,
    RegisterComponent,
    ActivateComponent,
    PasswordComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    accountState
} from './';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    imports: [ShozasSharedModule, RouterModule.forChild(accountState), NgxMaskModule.forRoot()],
    declarations: [
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShozasAccountModule {}
