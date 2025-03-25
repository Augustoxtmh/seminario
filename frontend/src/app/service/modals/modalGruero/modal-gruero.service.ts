import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { GrueroService } from '../../gruero/gruero.service';
import { Gruero } from 'src/app/models/gruero';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class ModalGrueroService {
  formularioGrueroModal: FormGroup;

  constructor(private fb: FormBuilder, private grueroServ: GrueroService) {
    this.formularioGrueroModal = this.fb.group({
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

  validarNombreTelefono(nombre: string, telefono: string): boolean {
    const soloLetrasEspacios = /^[a-zA-Z\s]+$/;
    const soloNumerosSimbolos = /^[0-9+\-()\s]+$/;
  
    return (
      !nombre || nombre.length < 5 || !soloLetrasEspacios.test(nombre) ||
      !telefono || telefono.length < 10 || !soloNumerosSimbolos.test(telefono)
    )
  }

  openFormModal(): Promise<any> {
    return Swal.fire({
      title: 'Nuevo Gruero',
      html: `
        <form [formGroup]="formularioGrueroModal">
          <div class="row mb-4 my-3 form-div">
            <div class="col-md-6">
              <label for="nombre" class="form-label">Nombre:</label>
              <input type="text" class="form-control" id="nombre" formControlName="nombre">
            </div>
            <div class="col-md-6">
              <label for="telefono" class="form-label">Teléfono:</label>
              <input type="text" class="form-control" id="telefono" formControlName="telefono">
            </div>
          </div>
        </form>

      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
    }).then(result => {
      if (result.isConfirmed) {
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value.trim();
        const telefono = (document.getElementById('telefono') as HTMLInputElement).value.trim();

        if (this.validarNombreTelefono(nombre, telefono)) {
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
        else
        {

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
          ).subscribe(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Guardado",
              showConfirmButton: false,
              timer: 1500,
              width: '20vw',
              padding: '20px',
            });
          });
        }        
    }})
  };
}
