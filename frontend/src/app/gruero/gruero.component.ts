import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrueroService } from '../service/gruero/gruero.service';
import { Gruero } from '../models/gruero'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError } from 'rxjs/internal/operators/catchError';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gruero',
  templateUrl: './gruero.component.html',
  styleUrls: ['./gruero.component.css']
})
export class GrueroComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  formularioGruero: FormGroup;
  formularioGrueroModificar: FormGroup;
  grueros: Gruero[] = [];
  displayedColumns: string[] = ['nombre', 'telefono'];
  dataSource = new MatTableDataSource<Gruero>([]);
  grueroSeleccionado: Gruero = new Gruero('', '', true, 0);

  constructor(private fb: FormBuilder, private grueroServ: GrueroService
  )
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

    this.formularioGrueroModificar = this.fb.group({
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
    this.grueroServ.getAllGrueros().pipe(
    catchError(() => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al buscar grueros",
        showConfirmButton: false,
        timer: 1500,
        width: '20vw',
        padding: '20px',
      });
      return [];
    })).subscribe((res) => {
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

    if (nombre == '' || telefono == '') {
      console.log('error')
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Todos los campos son requeridos",
        showConfirmButton: false,
        timer: 1500,
        width: '25vw',
        padding: '20px',
      });
      return;
    }
  
    this.grueroServ.createGruero(new Gruero(nombre, telefono, true)).pipe(
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
      this.grueros = [...this.grueros, res];
      this.dataSource.data = this.grueros;
    });
    
  }
  

  onRowClick(gruero: any) {
    this.grueroSeleccionado = gruero;
    this.formularioGrueroModificar.patchValue({
      nombre: gruero.NombreGruero,
      telefono: gruero.TelefonoGruero
    });
  }

  onSubmitSave()
  {
    const nombre = this.formularioGrueroModificar.controls['nombre'].value;
    const telefono = this.formularioGrueroModificar.controls['telefono'].value;

    if (nombre == '' || telefono == '') {
      console.log('error')
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Todos los campos son requeridos",
        showConfirmButton: false,
        timer: 1500,
        width: '25vw',
        padding: '20px',
      });
      return;
    }

    this.grueroServ.updateGruero(new Gruero(nombre, telefono, true, this.grueroSeleccionado.GrueroID ?? 0))
    .pipe(
      catchError(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al actualizar al gruero",
          showConfirmButton: false,
          timer: 1500,
          width: '20vw',
          padding: '20px',
        });
        return [];
      })).subscribe((res) => {
      console.log(res)

      this.grueroServ.getAllGrueros().pipe(
        catchError(() => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error al actualizar al gruero",
            showConfirmButton: false,
            timer: 1500,
            width: '20vw',
            padding: '20px',
          });
          return [];
        })).subscribe((res) => {
          this.grueros = res;
          this.dataSource.data = res;
        });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }
  

  onBack()
  {
    this.grueroSeleccionado = new Gruero('', '', true, 0)
  }

  onDelete()
  {
    this.grueroServ.deleteGruero(Number(this.grueroSeleccionado.GrueroID ?? 0)).pipe(
    catchError(() => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al borrar",
        showConfirmButton: false,
        timer: 1500,
        width: '20vw',
        padding: '20px',
      });
      return [];
    })).subscribe((res) => {
      this.grueros = this.grueros.filter(gruero => gruero.GrueroID !== this.grueroSeleccionado.GrueroID);
      this.dataSource.data = [...this.grueros];

      this.onBack()
    });
  }
}
