import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { PostModel } from '../models/postmodels.interface';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Sort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedcomponente',
  imports: [MatTableModule, MatPaginator, MatPaginatorModule, MatSortModule, MatInputModule, FormsModule, CommonModule],
  templateUrl: './pedcomponente.component.html',
  styleUrls: ['./pedcomponente.component.css'],
  providers: [ApiService]
})

export class PedcomponenteComponent implements OnInit {
  title = 'Tiendas';
  searchText:string="";
  //searchTerm: string = '';
  //listEcomm: any[] = [];

  listEcomm!:PostModel[];
  displayedColumns: string [] = ['ECOMMID', 'ECOMMNAME', 'ORDERCUST', 'CREATEDDATERP'];
  listEcommDataSource = new MatTableDataSource<PostModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getData().subscribe(data => {
      this.listEcomm = data;
      this.feedDataSource(data);
    });
  }

  feedDataSource(data:PostModel[]){
    this.listEcommDataSource = new MatTableDataSource<PostModel>(data);
    this.listEcommDataSource.paginator = this.paginator;
  }

  sortData(sort: Sort) {
    const data = this.listEcomm.slice();
    if (!sort.active || sort.direction === '') {
      this.feedDataSource(data);
      return;
    }

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

  onInputChange() {
    console.log('Prueba' + this.searchText);
    this.filterData();
  }

  filterData(){
    const search = this.searchText;
    const data = this.listEcomm.slice();
    if (!search){
      this.feedDataSource(data);
      return;
    }

    const dataFiltered = data.filter(item=>{
      return item.ECOMMNAME.toUpperCase().includes(search.toUpperCase()) ||
             item.ECOMMID.toString().includes(search.toUpperCase()) ||
             item.ORDERCUST.toUpperCase().includes(search.toUpperCase()) ||
             item.CREATEDDATERP.toUpperCase().includes(search.toUpperCase());
    });

    this.feedDataSource(dataFiltered);
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

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
