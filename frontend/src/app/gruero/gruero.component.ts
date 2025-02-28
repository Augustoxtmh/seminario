import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrueroService } from '../service/gruero/gruero.service';
import { Gruero } from '../models/gruero'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-gruero',
  templateUrl: './gruero.component.html',
  styleUrls: ['./gruero.component.css']
})
export class GrueroComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  formularioGruero: FormGroup;
  grueros: Gruero[] = [];
  displayedColumns: string[] = ['nombre', 'telefono'];
  dataSource = new MatTableDataSource<Gruero>([]);
  
  constructor(private fb: FormBuilder, private grueroServ: GrueroService)
  {
    this.formularioGruero = this.fb.group({
      nombre: [
        '',
        [Validators.required],
      ],
      telefono: [
        '',
        [Validators.required],
      ],}
    )
  }

  ngAfterViewInit() {
    this.grueroServ.getAllGrueros().subscribe((res) => {
      this.grueros = res;
      this.dataSource.data = res;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSubmit() {
    console.log('creando');
  
    const nombre = this.formularioGruero.controls['nombre'].value;
    const telefono = this.formularioGruero.controls['telefono'].value;
  
    this.grueroServ.createGruero(new Gruero(0, nombre, telefono, true)).subscribe((res) => {
      console.log(res);

      console.log(this.grueros)
      this.grueros = [...this.grueros, res];
      this.dataSource.data = this.grueros; 
    });
  }  

  onRowClick(gruero: Gruero) {
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
