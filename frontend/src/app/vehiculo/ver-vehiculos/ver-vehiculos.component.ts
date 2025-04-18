import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/service/vehiculo/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-vehiculos',
  templateUrl: './ver-vehiculos.component.html',
  styleUrls: ['./ver-vehiculos.component.css']
})
export class VerVehiculosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: String[] = ['Titular', 'Patente', 'Color', 'Marca', 'TipoPlan', 'Modelo'];
  dataSource = new MatTableDataSource<Vehiculo>([]);
  patentesSugeridas: String[] = [];
  vehiculos: Vehiculo[] = [];

  constructor(private vehiculoServ: VehiculoService, private router: Router) { }

  ngOnInit() {
    this.vehiculoServ.getAllVehiculos().pipe(
      catchError(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al obtener los datos",
          showConfirmButton: false,
          timer: 1500,
          width: '20vw',
          padding: '20px',
        });
        return [];
      })
    ).subscribe((res) => {
      this.vehiculos = res;
      this.dataSource.data = res;
    });
  };
  

  ngAfterViewInit() {
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
      this.dataSource.data = this.vehiculos.filter(vehiculo => vehiculo.Patente.toLowerCase().includes(value));
    } else {
      this.dataSource.data = this.vehiculos;
    }
  }

  onRowClick(vehiculo: Vehiculo) {
    const navigationExtras: NavigationExtras = { state: { vehiculo: vehiculo } };
    this.router.navigate(['/modificarVehiculo'], navigationExtras);
  } 
}
