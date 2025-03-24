import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../service/usuario/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  formularioUsuario: FormGroup;
  formularioUsuarioModificar: FormGroup;
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['nombre', 'contra','autoridad', 'estado'];
  dataSource = new MatTableDataSource<Usuario>([]);
  usuarioSeleccionado: Usuario = new Usuario('', '', '', false, 0);
  constructor(private fb: FormBuilder, private usuarioServ: UsuarioService)
  {
    this.formularioUsuario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      contra: ['', [Validators.required, Validators.minLength(5)]],
      autoridad: ['', [Validators.required]]
    });
    
    this.formularioUsuarioModificar = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      contra: ['', [Validators.required, Validators.minLength(5)]],
      autoridad: ['', [Validators.required]]
    });    
  }

  ngAfterViewInit() {
    this.usuarioServ.getAllUsuarios().pipe(
    catchError(() => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al buscar usuarios",
        showConfirmButton: false,
        timer: 1500,
        width: '20vw',
        padding: '20px',
      });
      return [];
    })).subscribe((res) => {
      this.usuarios = res;
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
    if(JSON.parse(localStorage.getItem("User") || '{}').Autoridad == 'A')
    {
      if(this.formularioUsuario.valid) {
        const nombre = this.formularioUsuario.controls['nombre'].value;
        const contraseña = this.formularioUsuario.controls['contra'].value;
        const autoridad = this.formularioUsuario.controls['autoridad'].value;

        this.usuarioServ.createUsuario(new Usuario(nombre, contraseña, autoridad, true)).pipe(
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
          this.usuarios = [...this.usuarios, res];
          this.dataSource.data = this.usuarios;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Creado con éxito",
            showConfirmButton: false,
            timer: 1500,
            width: '25vw',
            padding: '20px',
          });
        }); 
      }
    }
  }

  onRowClick(user: any) {
    this.usuarioSeleccionado = user;
    this.formularioUsuarioModificar.patchValue({
      nombre: user['Nombre'],
      contra: user['Contra'],
      autoridad: user['Autoridad']
    });
  }

  onSubmitSave() {
    if(JSON.parse(localStorage.getItem("User") || '{}').Autoridad == 'A')
    {
      if(this.formularioUsuarioModificar.valid) {
        const nombre = this.formularioUsuarioModificar.controls['nombre'].value;
        const contraseña = this.formularioUsuarioModificar.controls['contra'].value;
        const autoridad = this.formularioUsuarioModificar.controls['autoridad'].value;

        this.usuarioServ.updateUsuario(new Usuario(nombre, contraseña, autoridad, true, this.usuarioSeleccionado.UsuarioId))
        .pipe(
          catchError(() => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Error al actualizar al usuario",
              showConfirmButton: false,
              timer: 1500,
              width: '20vw',
              padding: '20px',
            });
            return [];
          })).subscribe(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Actualizado con éxito",
              showConfirmButton: false,
              timer: 1500,
              width: '25vw',
              padding: '20px',
            });
            this.ngAfterViewInit();
          }
        )
      }
    }
  }

  onBack() {
    this.usuarioSeleccionado = new Usuario('', '', '', true, 0);
  }

  onDelete() {
    return Swal.fire({
      title: '¿Seguro que quiere desactivar al usuario?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
      }).then(result => {
        if (result.isConfirmed) {
          this.usuarioServ.unableUsuario(this.usuarioSeleccionado).pipe(
          catchError(() => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Error al desactivar",
              showConfirmButton: false,
              timer: 1500,
              width: '20vw',
              padding: '20px',
            });
            return [];
          })).subscribe(() => {
            if(JSON.parse(localStorage.getItem("User") || '{}').Autoridad == 'A')
            {
              this.ngAfterViewInit();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Usuario desactivado",
                showConfirmButton: false,
                timer: 1500,
                width: '25vw',
                padding: '20px',
              });
              this.onBack();
            }
          });
        }
    })
  }
}
