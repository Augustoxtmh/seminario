import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Poliza } from 'src/app/models/poliza';
import { PolizaService } from 'src/app/service/poliza/poliza.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-polizas',
  templateUrl: './ver-polizas.component.html',
  styleUrls: ['./ver-polizas.component.css']
})
export class VerPolizasComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  polizas: Poliza[] = [];
  displayedColumns: string[] = ['poliza', 'telefono', 'patente', 'vigencia'];
  dataSource = new MatTableDataSource<Poliza>([]);

  
  constructor(private polizaServ: PolizaService, private router: Router)
  {}
  ngAfterViewInit() {

    this.polizaServ.getAllPoliza().pipe(
      catchError(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al obtener las polizas",
          showConfirmButton: false,
          timer: 1500,
          width: '20vw',
          padding: '20px',
        });
        return [];
      })).subscribe((res) => {
        this.polizas = res;
        this.dataSource.data = res;
      });
  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPatenteInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim().toLowerCase();

    if (value.length > 2) {
      this.dataSource.data = this.polizas.filter(polizas => polizas.Patente.toLowerCase().includes(value));
    } else {
      this.dataSource.data = this.polizas;
    }
  }

  onPolizaInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim().toLowerCase();

    if (value.length > 2) {
      this.dataSource.data = this.polizas.filter(polizas => polizas.NumeroPoliza.toLowerCase().includes(value));
    } else {
      this.dataSource.data = this.polizas;
    }
  }

  onRowClick(poliza: Poliza) {
    const navigationExtras: NavigationExtras = { state: { poliza: poliza } };
    this.router.navigate(['/modificarPoliza'], navigationExtras);
  } 
}
