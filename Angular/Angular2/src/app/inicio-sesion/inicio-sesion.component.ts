import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import * as CryptoJS from 'crypto-js';
import * as bootstrap from 'bootstrap';

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
  tituloModal: string = 'Información';
  infoModal: string = '';
  constructor(private apiService: ApiService, private router: Router) {
    sessionStorage.setItem('iniciosesion', 'false');
  }

  navigateToPage(): void {
    console.log('Email: ', this.email);
    console.log('Password: ', this.password);

    if (this.email.trim() == ''){
      const modalElement = document.getElementById('miModal') as HTMLElement;
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        this.infoModal = 'Ingrese correo electrónico';
        modal.show();
      }
    } else if(this.password.trim() == '') {
      const modalElement = document.getElementById('miModal') as HTMLElement;
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        this.infoModal = 'Ingrese contraseña';
        modal.show();
      }
    } else {
      this.apiService.getValidateCredentials(this.email, CryptoJS.MD5(this.password).toString())
        .subscribe({
          next: data => {
            this.userValid = data.UserValid; 
            if (this.userValid) {
              sessionStorage.setItem('iniciosesion', 'true');
              this.router.navigate(['tiendas']);
            } else {
              const modalElement = document.getElementById('miModal') as HTMLElement;
              if (modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                this.infoModal = 'Error en correo eletrónico y/o contraseña';
                modal.show();
              } else {
                console.log('Error en correo eletrónico y/o contraseña');
              }
            }
          },
          error: err => {
            console.log('Error al validar usuario', err);
          }
        });
    }
  }
}
