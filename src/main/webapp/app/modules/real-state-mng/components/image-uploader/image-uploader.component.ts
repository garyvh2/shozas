import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { RealStateImage } from 'app/@akita/external-models/real-state-image.model';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'jhi-image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {
    @Input()
    imageArray: RealStateImage[];

    constructor(private cd: ChangeDetectorRef, private snackBar: MatSnackBar) {}

    ngOnInit() {}

    onFileSelected(event: any) {
        const files = event.target.files;
        for (let index = 0; index < files.length; index++) {
            if (files[index].type.includes('image')) {
                const reader = new FileReader();
                reader.onload = () => {
                    const isPrimary = this.imageArray.length === 0 ? true : false;
                    if (this.imageArray.length + index < 5) {
                        this.imageArray.push({ source: reader.result.toString(), isPrimary });
                    }
                };
                reader.readAsDataURL(files[index]);
            }
        }
        this.cd.markForCheck();
    }

    onRemove(index: number) {
        if (this.imageArray[index].isPrimary && this.imageArray.length > 0) {
            this.imageArray[0].isPrimary = true;
        }
        this.imageArray.splice(index, 1);
    }
    setPrimary(selected: number) {
        const message = 'Se ha puesto la imagen como primaria';
        for (let index = 0; index < this.imageArray.length; index++) {
            if (index === selected) {
                this.imageArray[index].isPrimary = true;
            } else {
                this.imageArray[index].isPrimary = false;
            }
        }
        this.snackBar.open(message, 'cerrar', {
            duration: 2000,
            panelClass: 'snackbar'
        });
    }
}
