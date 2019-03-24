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
    registerAccount: any;
    success: boolean;
    modalRef: NgbModalRef;
    settingsForm: FormGroup;
    userType = UserType;
    settingsAccount: any;

    imageDataURL: string;

    constructor(
        private loginModalService: LoginModalService,
        private registerService: SettingsService,
        private fb: FormBuilder,
        private accountService: AccountService
    ) {
        this.settingsForm = this.fb.group({
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
            this.settingsAccount = { ...account };
            console.log('API ACCOUNT', account);
            console.log('COPY ACCOUNT', this.settingsAccount);
            this.settingsForm.get('userId').setValue(this.settingsAccount.userId);
            this.settingsForm.get('firstName').setValue(this.settingsAccount.firstName);
            this.settingsForm.get('lastName').setValue(this.settingsAccount.lastName);
            this.settingsForm.get('userType').setValue(this.settingsAccount.userType);
            this.settingsForm.get('phone').setValue(this.settingsAccount.phone.toString());
        });
    }

    getIdentifierMask(): string {
        return this.settingsForm.get('userType').value === UserType.Personal ? '0-0000-0000' : '0-0000-00000';
    }

    getUserIdentifierText(): string {
        return this.settingsForm.get('userType').value === UserType.Personal ? 'Cedula' : 'Cedula Juridica';
    }

    updateUser() {
        if (this.settingsForm.valid) {
            const updatedUser = { ...this.settingsAccount, ...this.settingsForm.value, imageUrl: this.imageDataURL };
            console.log('Updated User: ', updatedUser);
            this.accountService.save(updatedUser).subscribe(
                () => {
                    this.success = true;
                    this.settingsForm.reset({
                        userType: UserType.Personal
                    });
                    this.settingsForm.markAsPristine();
                    this.settingsForm.markAsUntouched();
                    this.settingsForm.updateValueAndValidity();
                },
                response => this.processError(response)
            );
        }
    }

    openLogin() {
        this.modalRef = this.loginModalService.open();
    }

    private processError(response: HttpErrorResponse) {
        this.success = null;
        if (response.status === 400 && response.error.type === USERID_ALREADY_USED_TYPE) {
            this.errorUserIdExists = 'ERROR';
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
                this.imageDataURL = reader.result.toString();
                img.src = this.imageDataURL;
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
            id: account.id,
            login: account.login,
            activated: account.activated,
            langKey: account.langKey,
            userId: account.userId,
            firstName: account.firstName,
            lastName: account.lastName,
            imageUrl: account.imageUrl,
            phone: account.phone,
            userType: account.userType
        };
    }
}
