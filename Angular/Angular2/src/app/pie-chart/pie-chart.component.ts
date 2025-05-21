import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { MenuComponent } from '../menu/menu.component';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pie-chart',
  imports: [MenuComponent],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
  providers: [ApiService]
})
export class PieChartComponent {
  title = 'Gráfico Estatus Tiendas';
  activa: number = 0;
  parado: number = 0;
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    const sesion = sessionStorage.getItem('iniciosesion');
    if (sesion?.toString() == "true"){
      
      this.apiService.getDataOrdersEcom().subscribe({
      next: data => {
        for (let i = 0; i < data.length; i++) {
          let status = data[i].ORDERCUST.toUpperCase();
          if (status === 'ACTIVA') {
            this.activa++;
          } else {
            this.parado++;
          }
        }
        this.crearGrafico();
      },
      error: err => {
        console.error("Error al obtener datos de Orders Ecom", err);
      }
    });

    } else {
      this.router.navigate(['inicio-sesion']);
    }
    
  }
  
  crearGrafico(): void {
    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Activa', 'Parado'],
        datasets: [{
          data: [this.activa, this.parado],
          backgroundColor: ['blue', 'yellow']
        }]
      }
    });
  }

}
