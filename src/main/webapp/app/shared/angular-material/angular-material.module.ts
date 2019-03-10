import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatGridListModule, MatDividerModule } from '@angular/material';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatGridListModule, MatDividerModule],
    exports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatGridListModule, MatDividerModule]
})
export class AngularMaterialModule {}
