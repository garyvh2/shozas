import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [CommonModule, BrowserAnimationsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
    exports: [BrowserAnimationsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule]
})
export class AngularMaterialModule {}
