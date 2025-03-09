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
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
  }

  openFormModal(): Promise<any> {
    return Swal.fire({
      title: 'Nuevo Gruero',
      html: `
        <form [formGroup]="formularioGrueroModal"">
          <div class="row mb-4 my-3 form-div">
            <div class="col-md-6">
              <label for="Patente" class="form-label">Patente:</label>
              <input type="text" class="form-control" id="Patente" formControlName="Patente">
            </div>
            <div class="col-md-2">
              <label for="TipoPlan" class="form-label">Plan:</label>
              <input type="text" class="form-control" id="TipoPlan" formControlName="TipoPlan">
            </div>
            <div class="col-md-4">
              <label for="Marca" class="form-label">Marca:</label>
              <input type="text" class="form-control" id="Marca" formControlName="Marca">
            </div>
            <div class="col-md-6 my-3">
              <label for="Color" class="form-label">Color:</label>
              <input type="text" class="form-control" id="Color" formControlName="Color">
            </div>
            <div class="col-md-6 my-3">
              <label for="Modelo" class="form-label">Modelo:</label>
              <input type="text" class="form-control" id="Modelo" formControlName="Modelo">
            </div>
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
    }).then(result => {
      if (result.isConfirmed) {
        const Patente = (document.getElementById('Patente') as HTMLInputElement).value.trim();
        const Marca = (document.getElementById('Marca') as HTMLInputElement).value.trim();
        const Color = (document.getElementById('Color') as HTMLInputElement).value.trim();
        const TipoPlan = (document.getElementById('TipoPlan') as HTMLInputElement).value.trim();
        const Modelo = (document.getElementById('Modelo') as HTMLInputElement).value.trim();
        
      if (!Patente || !Marca || !Color || !TipoPlan || !Modelo) {
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
      this.vehiculoServ.createVehiculo(new Vehiculo(Patente, Marca, Color, TipoPlan, Modelo, 1)).pipe(
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
          console.log(res);
      }); 
    }})
  };
}
