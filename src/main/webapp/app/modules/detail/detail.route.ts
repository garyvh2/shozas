import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateDetail } from 'app/modules/detail/views/state-detail/state-detail';

const routes: Routes = [
    {
        path: '/:id',
        component: StateDetail
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailRoutingModule {}
