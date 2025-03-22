import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router, NavigationExtras } from "@angular/router";
import { catchError } from "rxjs";
import { Cuota } from "src/app/models/cuota";
import { CuotaService } from "src/app/service/cuota/cuota.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-ver-cuotas',
  templateUrl: './ver-cuotas.component.html',
  styleUrls: ['./ver-cuotas.component.css']
})
export class VerCuotasComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  cuotas: Cuota[] = [];
  displayedColumns: string[] = ['numCuota', 'fechaVencimiento', 'monto', 'numPoliza'];
  dataSource = new MatTableDataSource<Cuota>([]);

  constructor(private cuotaServ: CuotaService, private router: Router) {}

  ngAfterViewInit() {
    this.cuotaServ.getAllCuota().pipe(
      catchError(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al obtener las cuotas",
          showConfirmButton: false,
          timer: 1500,
          width: '20vw',
          padding: '20px',
        });
        return [];
      })
    ).subscribe((res) => {
      this.cuotas = res;
      this.dataSource.data = res;
    });
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onNumeroPolizaInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim().toLowerCase();

    if (value.length > 2) {
      this.dataSource.data = this.cuotas.filter(cuota => cuota.NumeroPoliza.toLowerCase().includes(value));
    } else {
      this.dataSource.data = this.cuotas;
    }
  }

  onRowClick(cuota: Cuota) {
    const navigationExtras: NavigationExtras = { state: { cuota: cuota } };
    this.router.navigate(['/modificarCuota'], navigationExtras);
  }
}