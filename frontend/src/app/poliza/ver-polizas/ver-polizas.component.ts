import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Poliza } from 'src/app/models/poliza';
import { PolizaService } from 'src/app/service/poliza/poliza.service';

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

  
  constructor(private polizaServ: PolizaService)
  {}
  ngAfterViewInit() {

    this.polizaServ.getAllPoliza().subscribe((res) => {
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

  onRowClick(poliza: Poliza) {
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
