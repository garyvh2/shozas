import { ShozasSharedModule } from 'app/shared';
import { NgModule } from '@angular/core';

import { ListingsRoutingModule } from './listings.route';
import { FavoritesComponent } from './views/favorites/favorites.component';

@NgModule({
    declarations: [FavoritesComponent],
    imports: [ShozasSharedModule, ListingsRoutingModule]
})
export class ListingsModule {}
