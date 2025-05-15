import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-inicio-sesion',
  imports: [RouterModule, FormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css',
  providers: [ApiService]
})
export class InicioSesionComponent {
  title:string = 'Iniciar Sesión';
  email: string = '';
  password: string = '';
  userValid: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {
    sessionStorage.setItem('iniciosesion', 'false');
  }

  navigateToPage(): void {
    console.log('Email: ', this.email);
    console.log('Password: ', this.password);
    //clave 12345
   
      this.apiService.getValidateCredentials(this.email, CryptoJS.MD5(this.password).toString())
      .subscribe({
        next: data => {
          this.userValid = data.UserValid; 
          if (this.userValid){
            sessionStorage.setItem('iniciosesion', 'true');
            this.router.navigate(['tiendas']);
          } else {
            alert ('Error en usuario y/o contraseña');
          }
        },
        error: err => {
          console.error("Error al validar usuario", err);
        }
      });

    
          
          
     
    
    
    
  }

}
