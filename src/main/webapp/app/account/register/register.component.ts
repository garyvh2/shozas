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

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared';
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
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    modalRef: NgbModalRef;
    registerForm: FormGroup;
    passwordsMatcher = new RepeatPasswordEStateMatcher();
    userType = UserType;
    constructor(private loginModalService: LoginModalService, private registerService: Register, private fb: FormBuilder) {
        this.registerForm = this.fb.group(
            {
                firstName: new FormControl('', Validators.required),
                lastName: new FormControl('', Validators.required),
                userType: new FormControl(UserType.Personal, Validators.required),
                userIdentifier: new FormControl('', Validators.required),
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
        return this.registerForm.get('userType').value === UserType.Personal ? 'Cedula' : 'Cedula Juridica';
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
            const newUser = { ...this.registerForm.value };
            console.log('ha sido creado');
            this.registerForm.reset();
            // this.registerService.save(newUser).subscribe(
            //     () => {
            //         this.success = true;
            //     },
            //     response => this.processError(response)
            // );
        }
        // if (this.registerAccount.password !== this.confirmPassword) {
        //     this.doNotMatch = 'ERROR';
        // } else {
        //     this.doNotMatch = null;
        //     this.error = null;
        //     this.errorUserExists = null;
        //     this.errorEmailExists = null;
        //     this.registerAccount.langKey = 'en';
        //     this.registerService.save(this.registerAccount).subscribe(
        //         () => {
        //             this.success = true;
        //         },
        //         response => this.processError(response)
        //     );
        // }

        console.log(this.registerForm.get('userIdentifier'));
    }

    openLogin() {
        this.modalRef = this.loginModalService.open();
    }

    private processError(response: HttpErrorResponse) {
        this.success = null;
        if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }
}
