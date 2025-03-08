import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Cuota } from 'src/app/models/cuota';
import { Poliza } from 'src/app/models/poliza';
import { Usuario } from 'src/app/models/usuario';
import { CuotaService } from 'src/app/service/cuota/cuota.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-cuotas',
  templateUrl: './ver-cuotas.component.html',
  styleUrls: ['./ver-cuotas.component.css']
})
export class VerCuotasComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  usuario: Usuario[] = [];
  cuota: Cuota[] = [];
  displayedColumns: string[] = ['cuota', 'poliza', 'vigencia', 'monto', 'usuario'];
  dataSource = new MatTableDataSource<Cuota>([]);

  constructor(private cuotaServ: CuotaService, private usuarioServ: UsuarioService)
  {}
  ngAfterViewInit() {

    this.usuarioServ.getAllUsuarios().pipe(
      catchError(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al guardar",
          showConfirmButton: false,
          timer: 1500,
          width: '20vw',
          padding: '20px',
        });
        return [];
      })
        ).subscribe((res) => {
      this.usuario = res;
    })

    this.cuotaServ.getAllCuota().pipe(
      catchError(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al guardar",
          showConfirmButton: false,
          timer: 1500,
          width: '20vw',
          padding: '20px',
        });
        return [];
      })
    ).subscribe((res) => {
      this.cuota = res;
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
