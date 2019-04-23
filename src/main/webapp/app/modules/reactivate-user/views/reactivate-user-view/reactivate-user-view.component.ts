import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ReactivateUserService } from '../../reactivate-user.service';

@Component({
    selector: 'jhi-reactivate-user-view',
    templateUrl: './reactivate-user-view.component.html',
    styleUrls: ['./reactivate-user-view.component.scss']
})
export class ReactivateUserViewComponent implements OnInit {
    reactivateAccount: FormGroup;

    error = false;
    errorEmailNotExists = false;
    success = false;
    isLoading = false;

    constructor(private fb: FormBuilder, private reactivateService: ReactivateUserService) {
        this.reactivateAccount = this.fb.group({
            login: new FormControl('', [Validators.required, Validators.email])
        });
    }

    ngOnInit() {}

    reactivate() {
        if (this.reactivateAccount.valid) {
            this.isLoading = true;

            const newUser = {
                ...this.reactivateAccount.value
            };

            console.log(newUser);

            this.reactivateService.reactivate(newUser).subscribe(
                response => {
                    this.isLoading = false;
                    this.errorEmailNotExists = false;
                    this.success = true;
                },
                error => {
                    this.isLoading = false;
                    this.errorEmailNotExists = true;
                }
            );
        }
    }
}
