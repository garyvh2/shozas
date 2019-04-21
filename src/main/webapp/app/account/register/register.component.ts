import {
    RepeatPasswordEStateMatcher,
    EmailValidation,
    PasswordValidation,
    RepeatPasswordValidator,
    PhoneValidation
} from './register.validation';
import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE, USERID_ALREADY_USED_TYPE } from 'app/shared';
import { LoginModalService } from 'app/core';
import { Register } from './register.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import UserType from 'app/@akita/external-models/user-type';

@Component({
    selector: 'jhi-register',
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorUserIdExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    modalRef: NgbModalRef;
    registerForm: FormGroup;
    passwordsMatcher = new RepeatPasswordEStateMatcher();
    userType = UserType;
    isLoading = false;
    constructor(private loginModalService: LoginModalService, private registerService: Register, private fb: FormBuilder) {
        this.registerForm = this.fb.group(
            {
                firstName: new FormControl('', Validators.required),
                lastName: new FormControl('', Validators.required),
                userType: new FormControl(UserType.Personal, Validators.required),
                userId: new FormControl('', Validators.required),
                email: new FormControl('', EmailValidation),
                password: new FormControl('', PasswordValidation),
                confirmPass: new FormControl('', [Validators.required]),
                phone: new FormControl('', PhoneValidation)
            },
            { validators: RepeatPasswordValidator }
        );
    }

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
    }

    getIdentifierMask(): string {
        return this.registerForm.get('userType').value === UserType.Personal ? '0-0000-0000' : '0-0000-00000';
    }

    getUserIdentifierText(): string {
        return this.registerForm.get('userType').value === UserType.Personal ? 'Cédula' : 'Cédula Jurídica';
    }

    ngAfterViewInit() {
        // this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
    }

    register() {
        this.registerForm.get('confirmPass').markAsTouched();
        if (this.registerForm.get('userType').value === UserType.Company) {
            this.registerForm.get('lastName').setValue(' ');
        }

        if (this.registerForm.valid) {
            this.isLoading = true;
            const newUser = {
                ...this.registerForm.value,
                phone: Number(this.registerForm.get('phone').value),
                login: this.registerForm.get('email').value
            };

            this.registerService.save(newUser).subscribe(
                () => {
                    this.isLoading = false;
                    this.success = true;
                    this.registerForm.reset({
                        userType: UserType.Personal
                    });
                    this.registerForm.markAsPristine();
                    this.registerForm.markAsUntouched();
                    this.registerForm.get('confirmPass').markAsUntouched();
                    this.registerForm.get('confirmPass').markAsPristine();
                    this.registerForm.updateValueAndValidity();
                },
                response => {
                    this.isLoading = false;
                    this.processError(response);
                }
            );
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
}
