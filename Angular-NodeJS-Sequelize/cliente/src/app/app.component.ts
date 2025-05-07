import { Component } from '@angular/core';
import { EncabezadoComponent } from './encabezado.component';
import { PieComponent } from './pie.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [EncabezadoComponent, PieComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cliente';
}
