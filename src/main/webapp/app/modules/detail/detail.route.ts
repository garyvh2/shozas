import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateDetailComponent } from 'app/modules/detail/views/state-detail/state-detail.component';

const routes: Routes = [
    {
        path: ':id',
        component: StateDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailRoutingModule {}
