import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry, MatStepper } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import RealStateType from 'app/@akita/external-models/real-state-type';
import { RealStateImage } from 'app/@akita/external-models/real-state-image.model';
import { AccountService, User } from 'app/core';
import { RealStateService, RealState, RealStateQuery } from 'app/@akita/real-state';
import { Subject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

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
    loading$: Observable<boolean>;
    error$: Observable<boolean>;
    realState$: Observable<RealState>;
    editableMode = false;

    constructor(
        private _formBuilder: FormBuilder,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private account: AccountService,
        private realStateService: RealStateService,
        private realStateQuery: RealStateQuery,
        private router: Router,
        private activeRoute: ActivatedRoute
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
            garage: new FormControl('', Validators.required),
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
        this.account
            .identity()
            .then(account => {
                this.userAccount = { ...account };
            })
            .catch(() => (this.userAccount = undefined));
        this.account.getAuthenticationState().subscribe(user => (this.userAccount = user));
        this.loading$ = this.realStateQuery.selectLoading();
        this.error$ = this.realStateQuery.selectError();
        this.isEditing();
    }
    firstStepValidation() {
        if (this.firstFormGroup.get('realStateType').value === RealStateType.LOT) {
            this.firstFormGroup.get('rooms').setValue(0);
            this.firstFormGroup.get('garage').setValue(0);
            this.firstFormGroup.get('stories').setValue(0);
            this.firstFormGroup.get('baths').setValue(0);
        }
        return this.firstFormGroup;
    }
    onFirstStepClick() {
        this.firstFormGroup.get('province').markAsTouched();
        this.firstFormGroup.get('city').markAsTouched();
        this.firstFormGroup.get('district').markAsTouched();
    }

    async isEditing() {
        const id = this.activeRoute.snapshot.paramMap.get('id');
        if (id) {
            this.editableMode = true;
            this.realState$ = this.realStateQuery.getDetail(id);
            this.setForm();
            this.realStateService.get(id);
        }
    }

    setForm() {
        this.realState$.subscribe(realState => {
            if (realState && realState.garage) {
                this.firstFormGroup = this._formBuilder.group({
                    id: new FormControl(realState.id),
                    realStateType: new FormControl(realState.realStateType, Validators.required),
                    province: new FormControl(realState.province, Validators.required),
                    latitude: new FormControl(realState.latitude),
                    longitude: new FormControl(realState.longitude),
                    city: new FormControl(realState.city, Validators.required),
                    district: new FormControl(realState.district, Validators.required),
                    price: new FormControl(realState.price, Validators.required),
                    description: new FormControl(realState.description, Validators.required),
                    rooms: new FormControl(realState.rooms.toString(), Validators.required),
                    garage: new FormControl(realState.garage.toString(), Validators.required),
                    stories: new FormControl(realState.stories.toString(), Validators.required),
                    baths: new FormControl(realState.baths.toString(), Validators.required),
                    size: new FormControl(realState.size, Validators.required),
                    postalCode: new FormControl(realState.postalCode || ''),
                    hasPool: new FormControl(realState.hasPool),
                    hasWater: new FormControl(realState.hasWater),
                    hasElectricity: new FormControl(realState.hasElectricity),
                    hasPrivateSecurity: new FormControl(realState.hasPrivateSecurity),
                    customAmenities: new FormControl(realState.customAmenities)
                });
                this.imageArray = realState.images.map(image => ({
                    ...image,
                    isPrimary: image.primary
                }));
            }
        });
    }

    getFormControlValue(name: string) {
        return this.firstFormGroup.get(name).value;
    }

    sendRealState() {
        const newRealState: RealState = {
            ...this.firstFormGroup.value,
            images: this.imageArray,
            owner: { ...this.userAccount, favorites: undefined }
        };
        if (this.editableMode) {
            this.realStateService.updateRealState(newRealState);
        } else {
            this.realStateService.createRealState(newRealState);
        }
    }

    goHome() {
        this.router.navigate(['']);
    }
}
