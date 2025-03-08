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
      Patente: [
        '',
        [Validators.required],
      ],
      Marca: [
        '',
        [Validators.required],
      ],
      Color: [
        '',
        [Validators.required],
      ],
      TipoPlan: [
        '',
        [Validators.required],
      ],
      Modelo: [
        '',
        [Validators.required],
      ],}
    )
  }

  onSubmit() {
    console.log('creando');
  
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
  }  
}
