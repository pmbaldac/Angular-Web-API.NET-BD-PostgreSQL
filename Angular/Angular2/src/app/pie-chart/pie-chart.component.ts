import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { MenuComponent } from '../menu/menu.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-pie-chart',
  imports: [MenuComponent],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
  providers: [ApiService]
})
export class PieChartComponent {
  title = 'Gráfico Estatus Tiendas';
  exito: number = 0;
  fallida: number = 0;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getData().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        let status = data[i].ORDERCUST.toUpperCase();
        if (status == 'EXITO'){
          this.exito++;
        } else {
          this.fallida++
        }
      }
      this.crearGrafico();
    })
  }
  
  crearGrafico(): void {
    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Exito', 'Fallidas'],
        datasets: [{
          data: [this.exito, this.fallida],
          backgroundColor: ['blue', 'yellow']
        }]
      }
    });
  }

}
