import { Routes } from '@angular/router';
import { TiendaComponent } from './tienda/tienda.component';
import { SistemasOperativosComponent } from './sistemasoperativos/sistemasoperativos.component';

export const routes: Routes = [
    { path: 'tienda', component: TiendaComponent },
    { path: 'sistemasoperativos', component: SistemasOperativosComponent },
    { path: '', redirectTo: 'tienda', pathMatch: 'full' }
];
    
