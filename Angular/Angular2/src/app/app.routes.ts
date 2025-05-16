import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'agregar-tiendas',
        loadComponent: () => import('./agregar-tiendas/agregar-tiendas.component').then(c => c.AgregarTiendasComponent)
    },
    {
        path: 'tiendas',
        loadComponent: () => import('./tiendas/tiendas.component').then(c => c.TiendasComponent)
    },
    {
        path: 'grafico',
        loadComponent: () => import('./pie-chart/pie-chart.component').then(c => c.PieChartComponent)
    },
    {
        path: 'sistemasoperativos',
        loadComponent: () => import('./sistemasoperativos/sistemasoperativos.component').then(c => c.SistemasoperativosComponent)
    },
    {
        path: 'inicio-sesion',
        loadComponent: () => import('./inicio-sesion/inicio-sesion.component').then(c => c.InicioSesionComponent)
    },
    {
        path:'',
        redirectTo: 'inicio-sesion',
        pathMatch: 'full'
    }

];
