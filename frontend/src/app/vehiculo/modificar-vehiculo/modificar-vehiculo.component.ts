import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/service/vehiculo/vehiculo.service';
import Swal from 'sweetalert2';

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
        [Validators.required, Validators.minLength(4)],
      ],
      Marca: [
        this.vehiculoRecibido?.Marca,
        [Validators.required, Validators.minLength(4)],
      ],
      Color: [
        this.vehiculoRecibido?.Color,
        [Validators.required, Validators.minLength(3)],
      ],
      TipoPlan: [
        this.vehiculoRecibido?.TipoPlan,
        [Validators.required, Validators.maxLength(2)],
      ],
      Modelo: [
        this.vehiculoRecibido?.Modelo,
        [Validators.required, Validators.minLength(4)],
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

    if (Patente == '' || Marca == '' || Color == '' || TipoPlan == '' || Modelo == '') {
      console.log('error')
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

    this.vehiculoServ.updateVehiculo(new Vehiculo(Patente, Marca, Color, TipoPlan, Modelo, 1)).pipe(
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
    return Swal.fire({
      title: '¿Seguro que quiere borrar al gruero?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
      }).then(result => {
      if (result.isConfirmed) {
        this.vehiculoServ.deleteVehiculo(this.vehiculoRecibido.Patente.toString()).subscribe(() => {
          this.onBack()
          this.router.navigate(['/verVehiculos']);
        });
      }
    })
  }
}
