import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseComponent } from 'app/modules/detail/views/house/house.component';
import { ApartmentComponent } from 'app/modules/detail/views/apartment/apartment.component';
import { LotComponent } from 'app/modules/detail/views/lot/lot.component';

const routes: Routes = [
    {
        path: 'home/:id',
        component: HouseComponent
    },
    {
        path: 'lot/:id',
        component: LotComponent
    },
    {
        path: 'apartment/:id',
        component: ApartmentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailRoutingModule {}
