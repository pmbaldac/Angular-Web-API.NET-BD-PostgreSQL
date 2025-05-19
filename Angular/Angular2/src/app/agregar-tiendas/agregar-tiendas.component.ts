import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-agregar-tiendas',
  imports: [MenuComponent, FormsModule, MatSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './agregar-tiendas.component.html',
  styleUrl: './agregar-tiendas.component.css',
  providers: [ApiService]
})
export class AgregarTiendasComponent {
  title = 'Agregar Tiendas';
  tituloModal: string = 'Información';
  infoModal: string = '';
  ecommname: string = '';
  status: string = '';
  RowAffected: number = 0;
  Message: string = '';
  selected = '';

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    const sesion = sessionStorage.getItem('iniciosesion');
    if (sesion?.toString() != "true"){
      this.router.navigate(['inicio-sesion']);

    }     
  }

  guardar(): void {
    this.apiService.postInsertEcom(this.ecommname.trim(), this.status)
      .subscribe({
        next: data => {
          const modalElement = document.getElementById('miModal') as HTMLElement;
          this.RowAffected = data.RowAffected; 
          this.Message = data.Message;
          if (this.RowAffected > 0) {
            if (modalElement) {
              const modal = new bootstrap.Modal(modalElement);
              this.infoModal = 'Tienda guardada con éxito';
              modal.show();
              this.ecommname = '';
              this.status = '';
            }
          } else {
            if (modalElement) {
              const modal = new bootstrap.Modal(modalElement);
              this.infoModal = this.Message;
              modal.show();
            }
          }
        },
        error: err => {
          console.log('Error al validar usuario', err);
        }
      });
  }
}
