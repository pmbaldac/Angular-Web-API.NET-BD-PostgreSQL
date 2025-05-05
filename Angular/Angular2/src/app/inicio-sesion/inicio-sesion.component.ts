import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  constructor(private router: Router) {}

  navigateToPage(): void {
    console.log('Email: ', this.email);
    console.log('Password: ', this.password);
    if (this.email == 'pedro@gmail.com' && this.password == "12345"){
      this.router.navigate(['tiendas']);
    } else {
      alert ('Error en usuario y/o contraseña');
    }
    
  }
    
}
