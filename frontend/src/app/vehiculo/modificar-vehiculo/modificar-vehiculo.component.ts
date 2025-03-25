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
    /*Validators.pattern('^[0-9]+$')
    Validators.pattern('^[a-zA-Z0-9\\s]+$')
    [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9+\\-()]+$')],
    , Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')*/
    this.formularioVehiculo = this.fb.group({
      Nombre: [
        this.vehiculoRecibido?.Nombre,
        [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')],
      ],
      Patente: [
        this.vehiculoRecibido?.Patente,
        [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9\\s]+$')],
      ],
      Marca: [
        this.vehiculoRecibido?.Marca,
        [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')],
      ],
      Color: [
        this.vehiculoRecibido?.Color,
        [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')],
      ],
      TipoPlan: [
        this.vehiculoRecibido?.TipoPlan,
        [Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9]+$')],
      ],
      Modelo: [
        this.vehiculoRecibido?.Modelo,
        [Validators.required, Validators.minLength(4),  Validators.pattern('^[a-zA-Z0-9\\s]+$')],
      ],}
    )
  }

  onSave()
  {

    const Nombre = this.formularioVehiculo.controls['Nombre'].value;
    const Patente = this.formularioVehiculo.controls['Patente'].value;
    const Marca = this.formularioVehiculo.controls['Marca'].value;
    const Color = this.formularioVehiculo.controls['Color'].value;
    const TipoPlan = this.formularioVehiculo.controls['TipoPlan'].value;
    const Modelo = this.formularioVehiculo.controls['Modelo'].value;

    if (Patente == '' || Marca == '' || Color == '' || TipoPlan == '' || Modelo == '') {
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

    this.vehiculoServ.updateVehiculo(new Vehiculo(Nombre, Patente, Marca, Color, TipoPlan, Modelo, JSON.parse(localStorage.getItem("User") || '{}').UsuarioId), this.vehiculoRecibido.Patente).pipe(
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
            title: "Actualizado con exito",
            showConfirmButton: false,
            timer: 1500,
            width: '25vw',
            padding: '20px',
          });
        this.router.navigate(['/verVehiculos']);
      }
    );
  }

  onBack()
  {
    this.vehiculoRecibido = new Vehiculo('', '', '', '', '', '', 0)
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
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Borrado con exito",
            showConfirmButton: false,
            timer: 1500,
            width: '25vw',
            padding: '20px',
          });
          this.onBack()
          this.router.navigate(['/verVehiculos']);
        });
      }
    })
  }
}
