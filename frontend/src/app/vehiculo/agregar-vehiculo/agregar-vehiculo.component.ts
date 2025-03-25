import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/service/vehiculo/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.css']
})
export class AgregarVehiculoComponent {
  formularioVehiculo: FormGroup;
  
  constructor(private fb: FormBuilder, private vehiculoServ: VehiculoService
    )
  {
    this.formularioVehiculo = this.fb.group({
      Nombre:[
        '',
        [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')],
      ],
      Patente: [
        '',
        [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9\\s]+$')],
      ],
      Marca: [
        '',
        [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')],
      ],
      Color: [
        '',
        [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')],
      ],
      TipoPlan: [
        '',
        [Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9]+$')],
      ],
      Modelo: [
        '',
        [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z0-9\\s]+$')],
      ],}
    )
  }

  onSubmit() {
    if(this.formularioVehiculo.valid)
    {
    
      const Nombre = this.formularioVehiculo.controls['Nombre'].value;
      const Patente = this.formularioVehiculo.controls['Patente'].value;
      const Marca = this.formularioVehiculo.controls['Marca'].value;
      const Color = this.formularioVehiculo.controls['Color'].value;
      const TipoPlan = this.formularioVehiculo.controls['TipoPlan'].value;
      const Modelo = this.formularioVehiculo.controls['Modelo'].value;

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
      });
    }
  }  
}
