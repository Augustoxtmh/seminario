import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/service/vehiculo/vehiculo.service';

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

    this.vehiculoServ.createVehiculo(new Vehiculo(Patente, Marca, Color, TipoPlan, Modelo, 1)).subscribe((res) => {
      console.log(res);
    }); 
  }  
}
