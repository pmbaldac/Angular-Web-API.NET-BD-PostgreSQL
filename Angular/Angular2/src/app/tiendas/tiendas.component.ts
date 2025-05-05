import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { ApiService } from './api.service';
import { PostModel } from '../models/postmodels.interface';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Sort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tiendas',
  imports: [MenuComponent, MatTableModule, MatPaginator, MatPaginatorModule, MatSortModule, MatInputModule, MatTooltipModule, FormsModule, CommonModule],
  templateUrl: './tiendas.component.html',
  styleUrl: './tiendas.component.css',
  providers: [ApiService]
})

export class TiendasComponent {
  //Variables
  title = 'Tiendas';
  searchText:string="";
  //searchTerm: string = '';
  //listEcomm: any[] = [];

  listEcomm!:PostModel[];
  displayedColumns: string [] = ['ECOMMID', 'ECOMMNAME', 'ORDERCUST', 'CREATEDDATERP'];
  selectedRow = { ECOMMID: '', ECOMMNAME: '', ORDERCUST: '', CREATEDDATERP: '' };
  listEcommDataSource = new MatTableDataSource<PostModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, private router: Router) { }

  //Obtener datos de la api
  ngOnInit() {
    const sesion = sessionStorage.getItem('iniciosesion');
    if (sesion?.toString() == "true"){
      this.apiService.getData().subscribe(data => {
        this.listEcomm = data;
        this.feedDataSource(data);
      });
    } else {
      this.router.navigate(['inicio-sesion']);
    }
  }

  //Pasar datos a listEcommDataSource
  feedDataSource(data:PostModel[]){
    this.listEcommDataSource = new MatTableDataSource<PostModel>(data);
    this.listEcommDataSource.paginator = this.paginator;
  }

  //Ordendar datos
  sortData(sort: Sort) {
    const data = this.listEcomm.slice();
    if (!sort.active || sort.direction === '') {
      this.feedDataSource(data);
      return;
    }

    //Ordernar por campos llamando la funcion compare
    const sortedData = data.sort((a,b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active){
        case 'ECOMMID':
          return compare (a.ECOMMID, b.ECOMMID, isAsc);
        case 'ECOMMNAME':
          return compare (a.ECOMMNAME, b.ECOMMNAME, isAsc);
        case 'ORDERCUST':
          return compare (a.ORDERCUST, b.ORDERCUST, isAsc);
        case 'CREATEDDATERP':
          return compare (a.CREATEDDATERP, b.CREATEDDATERP, isAsc);
        default:
          return 0;
      }
    });

    this.feedDataSource(sortedData);
  }

  //Buscar por el input
  onInputChange() {
    console.log('Prueba' + this.searchText);
    this.filterData();
  }

  //Filtrar datos
  filterData(){
    const search = this.searchText;
    const data = this.listEcomm.slice();
    if (!search){
      this.feedDataSource(data);
      return;
    }

    //Retornar datos filtrados
    const dataFiltered = data.filter(item=>{
      return item.ECOMMNAME.toUpperCase().includes(search.toUpperCase()) ||
             item.ECOMMID.toString().includes(search.toUpperCase()) ||
             item.ORDERCUST.toUpperCase().includes(search.toUpperCase()) ||
             item.CREATEDDATERP.toUpperCase().includes(search.toUpperCase());
    });

    this.feedDataSource(dataFiltered);
  }

  //Pasar datos a los input al hacer click en la tabla
  selectRow(row: any) {
    this.selectedRow = { ...row };
  }

  /*get totalMonto(): number {
    return this.listSistOp.reduce((acc, so) => {
      if (so.ORDERAMT < 50) {
        return acc + so.ORDERAMT;
      }
      return acc;
    }, 0);
  }*/

  /*get getEcomm() {
    return this.listEcomm.filter(ec => 
      ec.ECOMMNAME.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }*/
}

//Devuele 1 o -1 dependiendo la comparacion entre a y b y ajusta el resultado segun el valor de isAsc, para determinar el orden. 
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}