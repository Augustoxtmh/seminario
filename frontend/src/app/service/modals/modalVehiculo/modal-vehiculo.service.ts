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

  constructor(private vehiculoServ: VehiculoService) {
    
  }

  validarDatosVehiculo(Nombre: string, Patente: string, Marca: string, Color: string, TipoPlan: string, Modelo: string): boolean {
    const soloLetrasEspacios = /^[a-zA-Z\s]+$/;
    const soloLetrasNumerosEspacios = /^[a-zA-Z0-9\s]+$/;
    const soloNumeros = /^[0-9]+$/;
  
    return (
      !Nombre || Nombre.length < 8 || !soloLetrasEspacios.test(Nombre) ||
      !Patente || Patente.length < 6 || !soloLetrasNumerosEspacios.test(Patente) ||
      !Marca || Marca.length < 4 || !soloLetrasEspacios.test(Marca) ||
      !Color || Color.length < 3 || !soloLetrasEspacios.test(Color) ||
      !TipoPlan || TipoPlan.length !== 1 || !soloNumeros.test(TipoPlan) ||
      !Modelo || Modelo.length < 4 || !soloLetrasNumerosEspacios.test(Modelo)
    ) 
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
              <select class="form-control" id="TipoPlan" name="TipoPlan" formControlName="TipoPlan">
                <option value="" disabled selected>Tipo de plan</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>   
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
        
      if (this.validarDatosVehiculo(Nombre, Patente, Marca, Color, TipoPlan, Modelo)) {
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
