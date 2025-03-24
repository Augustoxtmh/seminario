import { Injectable } from '@angular/core';
import { VehiculoService } from '../../vehiculo/vehiculo.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { Vehiculo } from 'src/app/models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class ModalVehiculoService {
  formularioGrueroModal: FormGroup;

  constructor(private fb: FormBuilder, private vehiculoServ: VehiculoService) {
    this.formularioGrueroModal = this.fb.group({
      Nombre:[
        '',
        [Validators.required, Validators.minLength(8)],
      ],
      Patente: [
        '',
        [Validators.required, Validators.minLength(4)],
      ],
      Marca: [
        '',
        [Validators.required, Validators.minLength(4)],
      ],
      Color: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
      TipoPlan: [
        '',
        [Validators.required, Validators.maxLength(2)],
      ],
      Modelo: [
        '',
        [Validators.required, Validators.minLength(4)],
      ],
    });
  }

  openFormModal(): Promise<any> {
    return Swal.fire({
      title: 'Nuevo Vehiculo',
      html: `
        <form [formGroup]="formularioGrueroModal">
          <div class="row mb-4 my-3 form-div">
            <div class="col-md-5">
              <label for="Nombre" class="form-label">Titular:</label>
              <input type="text" class="form-control" id="Nombre" formControlName="Nombre">
            </div>
            <div class="col-md-3">
              <label for="Patente" class="form-label">Patente:</label>
              <input type="text" class="form-control" id="Patente" formControlName="Patente">
            </div>
            <div class="col-md-4">
              <label for="TipoPlan" class="form-label">Plan:</label>
              <input type="text" class="form-control" id="TipoPlan" formControlName="TipoPlan">
            </div>
            <div class="col-md-4 my-3">
              <label for="Marca" class="form-label">Marca:</label>
              <input type="text" class="form-control" id="Marca" formControlName="Marca">
            </div>
            <div class="col-md-4 my-3">
              <label for="Color" class="form-label">Color:</label>
              <input type="text" class="form-control" id="Color" formControlName="Color">
            </div>
            <div class="col-md-4 my-3">
              <label for="Modelo" class="form-label">Modelo:</label>
              <input type="text" class="form-control" id="Modelo" formControlName="Modelo">
            </div>
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      width: '60vw',
      padding: '20px',
    }).then(result => {
      if (result.isConfirmed) {
        const Nombre = (document.getElementById('Nombre') as HTMLInputElement).value.trim();
        const Patente = (document.getElementById('Patente') as HTMLInputElement).value.trim();
        const Marca = (document.getElementById('Marca') as HTMLInputElement).value.trim();
        const Color = (document.getElementById('Color') as HTMLInputElement).value.trim();
        const TipoPlan = (document.getElementById('TipoPlan') as HTMLInputElement).value.trim();
        const Modelo = (document.getElementById('Modelo') as HTMLInputElement).value.trim();
        
      if (!Nombre || !Patente || !Marca || !Color || !TipoPlan || !Modelo ||
        !(Nombre.length > 7) ||  !(Patente.length > 3) ||  !(Marca.length > 3)||  !(Color.length > 2)
          ||  !(TipoPlan.length < 2) ||  !(Modelo.length > 3)
      ) {
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
        this.vehiculoServ.createVehiculo(new Vehiculo(Nombre, Patente, Marca, Color, TipoPlan, Modelo, JSON.parse(localStorage.getItem("User") || '{}').UsuarioId)).pipe(
          catchError(() => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Error al guardar",
              showConfirmButton: false,
              timer: 1500,
              width: '25vw',
              padding: '20px',
            });
            return [];
          })).subscribe((res) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Guardado con exito",
              showConfirmButton: false,
              timer: 1500,
              width: '25vw',
              padding: '20px',
            });
          }
        )}
      }
    })
  };
}
