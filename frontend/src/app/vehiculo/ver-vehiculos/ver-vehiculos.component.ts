import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/service/vehiculo/vehiculo.service';

@Component({
  selector: 'app-ver-vehiculos',
  templateUrl: './ver-vehiculos.component.html',
  styleUrls: ['./ver-vehiculos.component.css']
})
export class VerVehiculosComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['Patente', 'Color', 'Marca', 'TipoPlan', 'Modelo'];
  dataSource = new MatTableDataSource<Vehiculo>([]);
  
  constructor(private vehiculoServ: VehiculoService){}

  ngOnInit() {
    this.vehiculoServ.getAllVehiculos().subscribe((res) => {
      this.dataSource.data = res;
    });
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClick(vehiculo: Vehiculo) {
    /* this.vehiculoServ.getVehiculoEspecifico(vehiculo.id.valueOf()).subscribe(
      vehiculoRecibido => {
        if (vehiculo.empresa == 1){
          this.datosVehiculoAgrosaltaService.setVehiculo(vehiculoRecibido);
          this.vehiculo = vehiculoRecibido;
          this.router.navigate(['/cliente/agrosalta']);
        } else {
          this.datosVehiculoLiderarService.setVehiculo(vehiculoRecibido);
          this.vehiculo = vehiculoRecibido;
          this.router.navigate(['/cliente/liderar']);
        };
      }
    ) */
  } 
}
