import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'tiendas',
        loadComponent: () => import('./tiendas/tiendas.component').then(c => c.TiendasComponent)
    },
    {
        path: 'sistemasoperativos',
        loadComponent: () => import('./sistemasoperativos/sistemasoperativos.component').then(c => c.SistemasoperativosComponent)
    },
    {
        path:'',
        redirectTo: 'tiendas',
        pathMatch: 'full'
    }

];
