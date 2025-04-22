import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedcomponente',
  //standalone: true,
  templateUrl: './pedcomponente.component.html',
  styleUrl: './pedcomponente.component.css',
  imports: [CommonModule]
})
export class PedcomponenteComponent {
  title = 'Tiendas';
  searchTerm: string = '';

  listSistOp = [
    {
      "id": "1",
      "nombre": "Almacen 1",
      "url": "https://www.microsoft.com/windows",
      "monto": 20.23
    },
    {
      "id": "2",
      "nombre": "Almacen 2",
      "url": "https://www.linux.org",
      "monto": 21.64
    },
    {
      "id": "3",
      "nombre": "Almacen 3",
      "url": "https://www.apple.com/macos",
      "monto": 22.7
    },
    {
      "id": "4",
      "nombre": "Almacen 4",
      "url": "https://www.google.com",
      "monto": 51.01
    }
  ];

  get totalMonto(): number {
    return this.listSistOp.reduce((acc, so) => {
      if (so.monto < 50) {
        return acc + so.monto;
      }
      return acc;
    }, 0);
  };

}
