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
        [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')],
      ],
      telefono: [
        '',
        [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9+\\-()\\s]+$')]
      ]      
    });
    
    this.formularioGrueroModificar = this.fb.group({
      nombre: [
        '',
        [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')],
      ],
      telefono: [
        '',
        [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9+\\-()\\s]+$')]
      ]       
    });    
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
      this.grueros = res.filter(gruero => gruero.DeAlta);
      this.dataSource.data = this.grueros;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSubmit() {
    if(this.formularioGruero.valid)
    {
      const nombre = this.formularioGruero.controls['nombre'].value;
      const telefono = this.formularioGruero.controls['telefono'].value;
  
      if (nombre == '' || telefono == '' || nombre.length < 5 || telefono.length < 10) {
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
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Creado con exito",
          showConfirmButton: false,
          timer: 1500,
          width: '25vw',
          padding: '20px',
        });
      }); 
    }
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
    if(this.formularioGrueroModificar.valid)
    {
      const nombre = this.formularioGrueroModificar.controls['nombre'].value;
      const telefono = this.formularioGrueroModificar.controls['telefono'].value;

      if (nombre == '' || telefono == '' || nombre.length < 5 || telefono.length < 10) {
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
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Actualizado con exito",
            showConfirmButton: false,
            timer: 1500,
            width: '25vw',
            padding: '20px',
          });
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
  }
  

  onBack()
  {
    this.grueroSeleccionado = new Gruero('', '', true, 0)
  }

  onDelete()
  {
    return Swal.fire({
      title: '¿Seguro que quiere borrar al gruero?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
      }).then(result => {
        if (result.isConfirmed) {
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
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Borrado con exito",
            showConfirmButton: false,
            timer: 1500,
            width: '25vw',
            padding: '20px',
          });
          this.onBack()
        });
      }
    })
  }
}
