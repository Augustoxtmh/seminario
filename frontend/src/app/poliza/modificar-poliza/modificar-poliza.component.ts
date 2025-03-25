import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Poliza } from 'src/app/models/poliza';
import { ModalVehiculoService } from 'src/app/service/modals/modalVehiculo/modal-vehiculo.service';
import { PolizaService } from 'src/app/service/poliza/poliza.service';
import { VehiculoService } from 'src/app/service/vehiculo/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-poliza',
  templateUrl: './modificar-poliza.component.html',
  styleUrls: ['./modificar-poliza.component.css']
})
export class ModificarPolizaComponent {
  formularioPoliza: FormGroup;
  patentesSugeridas: String[] = [];
  vehiculoSeleccionado: boolean = false;
  polizaRecibida: Poliza;
  date: Date = new Date();

  constructor(
    private fb: FormBuilder, 
    private polizaServ: PolizaService,
    private router: Router,
    private vehiculoServ: VehiculoService,
    private vehiculoModal: ModalVehiculoService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.polizaRecibida = navigation?.extras.state?.['poliza'];

    this.formularioPoliza = this.fb.group({
      poliza: [this.polizaRecibida.NumeroPoliza, [Validators.required, Validators.minLength(7), Validators.pattern('^[0-9]+$')]],
      telefono: [this.polizaRecibida.Telefono, [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9+\\-()\\s]+$')]],
      patente: [this.polizaRecibida.Patente, [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9\\s]+$')]],
    });
  }


  onGenerateCuota() {
    const navigationExtras: NavigationExtras = { state: { poliza: this.polizaRecibida } };
    this.router.navigate(['/generarCuota'], navigationExtras);
  }

  onSave() {
    if(this.formularioPoliza.valid)
    {
    
      const poliza = this.formularioPoliza.value.poliza;
      const telefono = this.formularioPoliza.value.telefono;
      const patente = this.formularioPoliza.value.patente;
      const date = new Date();

      if (this.formularioPoliza.invalid) {
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

      this.polizaServ.updatePoliza(new Poliza(poliza, telefono, patente, date, this.polizaRecibida.UsuarioId), this.polizaRecibida.NumeroPoliza).pipe(
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
      ).subscribe((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Actualizado con exito",
          showConfirmButton: false,
          timer: 1500,
          width: '25vw',
          padding: '20px',
        });
        this.router.navigate(['/verPolizas']);
      });
    }
  }

  onBack() {
    this.router.navigate(['/verPolizas']);
  }

  onDelete() {
    return Swal.fire({
      title: '¿Seguro que quiere borrar al gruero?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
      }).then(result => {
        if (result.isConfirmed) {
        this.polizaServ.deletePoliza(this.polizaRecibida).pipe(
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
          })).subscribe((res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Borrado con exito",
            showConfirmButton: false,
            timer: 1500,
            width: '25vw',
            padding: '20px',
          });
          this.router.navigate(['/verPolizas']);
        });
      }
    })
  }

  onPatenteInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();
    
    if (value.length > 2) {
      this.buscarPatentes(value);
    } else {
      this.patentesSugeridas = [];
    }
  }
  
  setValuePatente(patente: String) {
    this.vehiculoSeleccionado = true;
    this.formularioPoliza.controls['patente'].setValue(patente);
    this.patentesSugeridas = [];
  }  

  buscarPatentes(query: string) {
    this.vehiculoServ.getVehiculosPorPatente(query).pipe(
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
    })).subscribe((vehiculos: String[]) => {
      this.patentesSugeridas = vehiculos.map(vehiculo => vehiculo);
    }
  )};

  openVehiculoModal()
  {
    this.vehiculoModal.openFormModal()
  }
  
}