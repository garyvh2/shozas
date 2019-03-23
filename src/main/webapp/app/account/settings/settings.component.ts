import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE, USERID_ALREADY_USED_TYPE } from 'app/shared';
import { LoginModalService, AccountService } from 'app/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import UserType from 'app/@akita/external-models/user-type';
import { SettingsService } from './settings.service';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit {
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorUserIdExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    modalRef: NgbModalRef;
    registerForm: FormGroup;
    userType = UserType;
    settingsAccount: any;

    imageDataURL: string;

    constructor(
        private loginModalService: LoginModalService,
        private registerService: SettingsService,
        private fb: FormBuilder,
        private accountService: AccountService
    ) {
        this.registerForm = this.fb.group({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            userType: new FormControl(UserType.Personal, Validators.required),
            userId: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};

        this.accountService.identity().then(account => {
            this.settingsAccount = this.copyAccount(account);
            console.log('SETTINGS ACCOUNT', account);
            this.registerForm.get('userId').setValue(account.userId);
            this.registerForm.get('firstName').setValue(account.firstName);
            this.registerForm.get('lastName').setValue(account.lastName);
            this.registerForm.get('userType').setValue(account.userType);
            this.registerForm.get('phone').setValue(account.phone.toString());
            console.log('USERTYPE');
            console.log(account.userType);
            console.log(this.userType);
        });
    }

    getIdentifierMask(): string {
        return this.registerForm.get('userType').value === UserType.Personal ? '0-0000-0000' : '0-0000-00000';
    }

    getUserIdentifierText(): string {
        return this.registerForm.get('userType').value === UserType.Personal ? 'Cedula' : 'Cedula Juridica';
    }

    register() {
        if (this.registerForm.get('userType').value === UserType.Company) {
            this.registerForm.get('lastName').setValue(' ');
        }

        if (this.registerForm.valid) {
            const newUser = {
                ...this.registerForm.value,
                phone: Number(this.registerForm.get('phone').value),
                login: this.registerForm.get('email').value
            };

            // this.registerService.save(newUser).subscribe(
            //     () => {
            //         this.success = true;
            //         this.registerForm.reset({
            //             userType: UserType.Personal
            //         });
            //         this.registerForm.markAsPristine();
            //         this.registerForm.markAsUntouched();
            //         this.registerForm.get('confirmPass').markAsUntouched();
            //         this.registerForm.get('confirmPass').markAsPristine();
            //         this.registerForm.updateValueAndValidity();
            //     },
            //     response => this.processError(response)
            // );
        }
    }

    openLogin() {
        this.modalRef = this.loginModalService.open();
    }

    private processError(response: HttpErrorResponse) {
        this.success = null;
        if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
            this.errorUserIdExists = null;
            this.error = null;
        } else if (response.status === 400 && response.error.type === USERID_ALREADY_USED_TYPE) {
            this.errorUserIdExists = 'ERROR';
            this.errorUserExists = null;
            this.error = null;
        } else {
            this.error = 'ERROR';
        }
    }

    processFile(event, img: any) {
        const file: File = event.target.files[0];
        const reader = new FileReader();

        if (event.target.files && event.target.files.length) {
            // const [file] = event.target.files;

            reader.readAsDataURL(file);

            reader.onload = () => {
                console.log('File Reader Result: ', reader.result);
                img.src = reader.result.toString();
            };
        }
    }

    save() {
        // this.accountService.save(this.settingsAccount).subscribe(
        //     () => {
        //         this.error = null;
        //         this.success = 'OK';
        //         this.accountService.identity(true).then(account => {
        //             this.settingsAccount = this.copyAccount(account);
        //         });
        //     },
        //     () => {
        //         this.success = null;
        //         this.error = 'ERROR';
        //     }
        // );
    }
    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }
}
