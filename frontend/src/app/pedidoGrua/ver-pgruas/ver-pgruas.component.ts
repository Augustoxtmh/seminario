import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Gruero } from 'src/app/models/gruero';
import { PGrua } from 'src/app/models/pgrua';
import { GrueroService } from 'src/app/service/gruero/gruero.service';
import { PgruaService } from 'src/app/service/pgrua/pgrua.service';

@Component({
  selector: 'app-ver-pgruas',
  templateUrl: './ver-pgruas.component.html',
  styleUrls: ['./ver-pgruas.component.css']
})
export class VerPGruasComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  polizas: PGrua[] = [];
  grueros: Gruero[] = [];
  displayedColumns: string[] = ['NombreCliente', 'Patente', 'FechaHoraPedido', 'gruero'];
  dataSource = new MatTableDataSource<PGrua>([]);
  
  constructor(private pedidoGrua: PgruaService, private grueroServ: GrueroService)
  {}

  ngAfterViewInit() {

    this.pedidoGrua.getAllPedidogrua().subscribe((res) => {
      this.polizas = res;
      this.dataSource.data = res;
    });

    this.grueroServ.getAllGrueros().subscribe((res) => {
      this.grueros = res;
    })
  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClick(poliza: PGrua) {
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
