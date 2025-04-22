import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PedcomponenteComponent } from './pedcomponente/pedcomponente.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PedcomponenteComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
}
