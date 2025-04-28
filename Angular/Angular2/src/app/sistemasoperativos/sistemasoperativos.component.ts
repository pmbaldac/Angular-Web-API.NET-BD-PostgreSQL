import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sistemasoperativos',
  //standalone: true,
  templateUrl: './sistemasoperativos.component.html',
  styleUrl: './sistemasoperativos.component.css',
  imports: [CommonModule]
})
export class SistemasOperativosComponent {
  title = 'Sistemas Operativos';
  searchTerm: string = '';

  listSistOp = [
    {
      "id": "1",
      "nombre": "Windows",
      "url": "https://www.microsoft.com/windows",
      "monto": 20.23
    },
    {
      "id": "2",
      "nombre": "Linux",
      "url": "https://www.linux.org",
      "monto": 21.64
    },
    {
      "id": "3",
      "nombre": "Macintosh",
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
