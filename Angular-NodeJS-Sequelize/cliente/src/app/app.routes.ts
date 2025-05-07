import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegistroUsuarioComponent } from './registro-usuario.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
      path: 'registrousuario',
      component: RegistroUsuarioComponent
  },
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
