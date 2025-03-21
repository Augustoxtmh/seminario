import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Gruero } from 'src/app/models/gruero';
import { PGrua } from 'src/app/models/pgrua';
import { GrueroService } from 'src/app/service/gruero/gruero.service';
import { PgruaService } from 'src/app/service/pgrua/pgrua.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-pgruas',
  templateUrl: './ver-pgruas.component.html',
  styleUrls: ['./ver-pgruas.component.css']
})
export class VerPGruasComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pedidosGruas: PGrua[] = [];
  grueros: Gruero[] = [];
  displayedColumns: string[] = ['NombreCliente', 'Patente', 'FechaHoraPedido', 'gruero'];
  dataSource = new MatTableDataSource<PGrua>([]);
  mostrandoFaltantes: boolean = false;

  constructor(
    private pedidoGrua: PgruaService, 
    private grueroServ: GrueroService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {       
    this.grueroServ.getAllGrueros().pipe(
      catchError(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al obtener grueros",
          showConfirmButton: false,
          timer: 1500,
          width: '20vw',
          padding: '20px',
        });
        return [];
      })
    ).subscribe((res) => {
      this.grueros = res;
    });

    this.pedidoGrua.getAllPedidogrua().pipe(
      catchError(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al traer los datos",
          showConfirmButton: false,
          timer: 1500,
          width: '20vw',
          padding: '20px',
        });
        return [];
      })
    ).subscribe((res) => {
      this.pedidosGruas = res;
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
      this.dataSource.data = this.pedidosGruas.filter(pedido => 
        pedido.Patente.toLowerCase().includes(value)
      );
    } else {
      this.dataSource.data = this.pedidosGruas;
    }
  }

  filtrarPedidosFaltantes() {
    if (this.mostrandoFaltantes) {
      this.dataSource.data = this.pedidosGruas;
    } else {
      this.dataSource.data = this.pedidosGruas.filter(pedido => pedido.Monto === 0 || !pedido.urlFactura);
    }
    this.mostrandoFaltantes = !this.mostrandoFaltantes;
    console.log(this.mostrandoFaltantes)
  }
  

  onRowClick(pgrua: PGrua) {
    const navigationExtras: NavigationExtras = { 
      state: { 
        pgrua: pgrua, 
        grueroN: this.grueros[Number(pgrua.GrueroID) - 1]?.NombreGruero || 'Desconocido'
      } 
    };
    this.router.navigate(['/modificarPedidoGrua'], navigationExtras);
  } 
}
