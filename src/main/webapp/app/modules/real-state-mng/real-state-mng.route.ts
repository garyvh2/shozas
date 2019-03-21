import { RealStateMngViewComponent } from './views/real-state-mng-view/real-state-mng-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'edit/:id',
        component: RealStateMngViewComponent
    },
    {
        path: 'create',
        component: RealStateMngViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RealStateMngRoutingModule {}
