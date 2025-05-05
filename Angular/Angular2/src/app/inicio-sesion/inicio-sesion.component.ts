import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-inicio-sesion',
  imports: [RouterModule, FormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  title:string = 'Iniciar Sesión';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {
    sessionStorage.setItem('iniciosesion', 'false');
  }

  navigateToPage(): void {
    console.log('Email: ', this.email);
    console.log('Password: ', this.password);
    //clave 12345
    if (this.email == 'pedro@gmail.com' && CryptoJS.MD5(this.password).toString() == "827ccb0eea8a706c4c34a16891f84e7b"){
      sessionStorage.setItem('iniciosesion', 'true');
      this.router.navigate(['tiendas']);
    } else {
      alert ('Error en usuario y/o contraseña');
    }
    
  }
    
}
