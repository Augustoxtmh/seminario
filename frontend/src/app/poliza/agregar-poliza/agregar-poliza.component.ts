import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { PolizaService } from 'src/app/service/poliza/poliza.service';
import { VehiculoService } from 'src/app/service/vehiculo/vehiculo.service';
import { Poliza } from 'src/app/models/poliza';
import { catchError } from 'rxjs/internal/operators/catchError';
import Swal from 'sweetalert2';
import { ModalVehiculoService } from 'src/app/service/modals/modalVehiculo/modal-vehiculo.service';

@Component({
  selector: 'app-agregar-poliza',
  templateUrl: './agregar-poliza.component.html',
  styleUrls: ['./agregar-poliza.component.css']
})
export class AgregarPolizaComponent {

  formularioPoliza: FormGroup;
  patentesSugeridas: String[] = [];
  vehiculoSeleccionado: boolean = false;
  date: Date = new Date();

  constructor(
    private fb: FormBuilder, 
    private polizaServ: PolizaService,
    private router: Router,
    private vehiculoServ: VehiculoService, 
    private vehiculoModalServ: ModalVehiculoService
  ) {
    this.formularioPoliza = this.fb.group({
      poliza: ['', [Validators.required, Validators.minLength(7)]],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      patente: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    if(this.formularioPoliza.valid)
    {
      const poliza = this.formularioPoliza.value.poliza;
      const telefono = this.formularioPoliza.value.telefono;
      const patente = this.formularioPoliza.value.patente;
      const date = new Date();

      if (poliza == '' || telefono == '' || patente == '') {
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

      if (poliza == '' || telefono == '' || patente == '') {
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

      this.polizaServ.createPoliza(new Poliza(poliza, telefono, patente, date, JSON.parse(localStorage.getItem("User") || '{}').UsuarioId)).pipe(
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
          title: "Guardado con exito",
          showConfirmButton: false,
          timer: 1500,
          width: '25vw',
          padding: '20px',
        });
        console.log('Póliza creada:', res);
        const navigationExtras: NavigationExtras = { state: { poliza: res } };
        this.router.navigate(['/generarCuota'], navigationExtras);
      });
    }
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
      })
    ).subscribe((vehiculos: String[]) => {
        this.patentesSugeridas = vehiculos.map(vehiculo => vehiculo);
      }
    )
  };

  openVehiculoModal() {
    this.vehiculoModalServ.openFormModal();
  }
}
