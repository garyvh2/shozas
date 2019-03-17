import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export const EmailValidation = [Validators.required, Validators.email];
export const PasswordValidation = [Validators.required, Validators.minLength(8), Validators.maxLength(24)];
export const PhoneValidation = [Validators.required];

export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        if (control && control.parent.get('confirmPass').value === '' && control.touched) {
            return true;
        }
        return control && control.parent.get('password').value !== control.parent.get('confirmPass').value && control.dirty;
    }
}
export function RepeatPasswordValidator(group: FormGroup) {
    const password = group.controls.password.value;
    const passwordConfirmation = group.controls.confirmPass.value;

    return password === passwordConfirmation ? null : { passwordsNotEqual: true };
}
