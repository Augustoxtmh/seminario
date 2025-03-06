import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/service/vehiculo/vehiculo.service';

@Component({
  selector: 'app-modificar-vehiculo',
  templateUrl: './modificar-vehiculo.component.html',
  styleUrls: ['./modificar-vehiculo.component.css']
})
export class ModificarVehiculoComponent {
  formularioVehiculo: FormGroup;
  vehiculoRecibido: Vehiculo;
  
  constructor(private fb: FormBuilder, private vehiculoServ: VehiculoService,
    private router: Router
    )
  {
    const navigation = this.router.getCurrentNavigation();
    this.vehiculoRecibido = navigation?.extras.state?.['vehiculo'];

    this.formularioVehiculo = this.fb.group({
      Patente: [
        this.vehiculoRecibido?.Patente,
        [Validators.required],
      ],
      Marca: [
        this.vehiculoRecibido?.Marca,
        [Validators.required],
      ],
      Color: [
        this.vehiculoRecibido?.Color,
        [Validators.required],
      ],
      TipoPlan: [
        this.vehiculoRecibido?.TipoPlan,
        [Validators.required],
      ],
      Modelo: [
        this.vehiculoRecibido?.Modelo,
        [Validators.required],
      ],}
    )
  }

  onSave()
  {

    const Patente = this.formularioVehiculo.controls['Patente'].value;
    const Marca = this.formularioVehiculo.controls['Marca'].value;
    const Color = this.formularioVehiculo.controls['Color'].value;
    const TipoPlan = this.formularioVehiculo.controls['TipoPlan'].value;
    const Modelo = this.formularioVehiculo.controls['Modelo'].value;

    this.vehiculoServ.updateVehiculo(this.vehiculoRecibido.Patente.toString(), new Vehiculo(Patente, Marca, Color, TipoPlan, Modelo, 1)).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/verVehiculos']);
    });
  }

  onBack()
  {
    this.vehiculoRecibido = new Vehiculo('', '', '', '', '', 0)
    this.router.navigate(['/verVehiculos']);
  }

  onDelete()
  {
    this.vehiculoServ.deleteVehiculo(this.vehiculoRecibido.Patente.toString()).subscribe(() => {
      this.onBack()
      this.router.navigate(['/verVehiculos']);
    });
  }
}
