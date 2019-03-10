import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
    exports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule]
})
export class AngularMaterialModule {}
