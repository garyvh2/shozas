import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry, MatStepper } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import RealStateType from 'app/@akita/external-models/real-state-type';
import { RealStateImage } from 'app/@akita/external-models/real-state-image.model';
import { AccountService, User } from 'app/core';
import { RealStateService, RealState } from 'app/@akita/real-state';
import { Subject } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'jhi-real-state-mng-view',
    templateUrl: './real-state-mng-view.component.html',
    styleUrls: ['real-state-mng-view.scss']
})
export class RealStateMngViewComponent implements OnInit {
    isLinear = false;
    firstFormGroup: FormGroup;
    imageArray: RealStateImage[] = [];
    latitude = 0;
    longitude = 0;
    userAccount: User;
    observable: Subject<RealState> = new Subject();
    isLoading = true;
    isError = false;
    isSuccess = false;

    constructor(
        private _formBuilder: FormBuilder,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private account: AccountService,
        private realStateService: RealStateService,
        private router: Router
    ) {
        this.firstFormGroup = this._formBuilder.group({
            realStateType: new FormControl(RealStateType.HOUSE, Validators.required),
            province: new FormControl('', Validators.required),
            latitude: new FormControl(9.9325634),
            longitude: new FormControl(-84.1348913),
            city: new FormControl('', Validators.required),
            district: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            rooms: new FormControl('', Validators.required),
            gar: new FormControl('', Validators.required),
            stories: new FormControl('', Validators.required),
            baths: new FormControl('', Validators.required),
            size: new FormControl('', Validators.required),
            postalCode: new FormControl(),
            hasPool: new FormControl(false),
            hasWater: new FormControl(false),
            hasElectricity: new FormControl(false),
            hasPrivateSecurity: new FormControl(false),
            customAmenities: new FormControl([])
        });
    }
    ngOnInit() {
        this.matIconRegistry.addSvgIcon(`rsd_pin`, this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/pin.svg'));
        this.matIconRegistry.addSvgIcon(`rsd_bed`, this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/bed.svg'));
        this.matIconRegistry.addSvgIcon(
            `rsd_garage`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/garage.svg')
        );
        this.matIconRegistry.addSvgIcon(`rsd_ruler`, this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/ruler.svg'));
        this.matIconRegistry.addSvgIcon(
            `rsd_favorite`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/favorite.svg')
        );
        this.matIconRegistry.addSvgIcon(`rsd_bath`, this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/bath.svg'));

        this.matIconRegistry.addSvgIcon(`rsd_up`, this.domSanitizer.bypassSecurityTrustResourceUrl('../../../content/images/up.svg'));
        this.account.getAuthenticationState().subscribe(user => (this.userAccount = user));
    }
    onFirstStepClick() {
        this.firstFormGroup.get('province').markAsTouched();
        this.firstFormGroup.get('city').markAsTouched();
        this.firstFormGroup.get('district').markAsTouched();
        if (this.firstFormGroup.get('realStateType').value === RealStateType.LOT) {
            this.firstFormGroup.get('rooms').setValue(0);
            this.firstFormGroup.get('gar').setValue(0);
            this.firstFormGroup.get('stories').setValue(0);
            this.firstFormGroup.get('baths').setValue(0);
        }
    }

    getFormControlValue(name: string) {
        return this.firstFormGroup.get(name).value;
    }

    sendRealState() {
        const newRealState: RealState = {
            ...this.firstFormGroup.value,
            images: this.imageArray,
            owner: this.userAccount
        };
        this.realStateService.createRealState(newRealState).add(response => {
            this.isLoading = false;
            console.log('test', response);
            if (response) {
                this.isSuccess = true;
            } else {
                this.isError = false;
            }
        });
    }

    goHome(stepper: MatStepper) {
        stepper.reset();
        this.router.navigate(['']);
    }
}
