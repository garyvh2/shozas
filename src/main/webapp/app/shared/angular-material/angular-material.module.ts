import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatGridListModule } from '@angular/material';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatGridListModule],
    exports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatGridListModule]
})
export class AngularMaterialModule {}
