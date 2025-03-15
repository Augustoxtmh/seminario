import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Poliza } from 'src/app/models/poliza';
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
  polizaRecibida: Poliza;
  date: Date = new Date();

  constructor(
    private fb: FormBuilder, 
    private polizaServ: PolizaService,
    private router: Router,
    private vehiculoServ: VehiculoService
  ) {

    const navigation = this.router.getCurrentNavigation();
    this.polizaRecibida = navigation?.extras.state?.['poliza'];

    this.formularioPoliza = this.fb.group({
      poliza: [this.polizaRecibida.NumeroPoliza, [Validators.required, Validators.minLength(7)]],
      telefono: [this.polizaRecibida.Telefono, [Validators.required, Validators.minLength(10)]],
      patente: [this.polizaRecibida.Patente, [Validators.required, Validators.minLength(4)]],
    });
  }

  onGenerateCuota() {
    const navigationExtras: NavigationExtras = { state: { poliza: this.polizaRecibida } };
    this.router.navigate(['/generarCuota'], navigationExtras);
  }

  onSave() {
    if(this.formularioPoliza.valid)
    {
      console.log('creando');
    
      const poliza = this.formularioPoliza.value.poliza;
      const telefono = this.formularioPoliza.value.telefono;
      const patente = this.formularioPoliza.value.patente;
      const date = new Date();

      this.polizaServ.updatePoliza(new Poliza(poliza, telefono, patente, date, 1)).pipe(
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
        console.log('Póliza actualizada:', res);
        this.router.navigate(['/verPolizas']);
      });
    }
  }

  onBack() {
    this.router.navigate(['/verPolizas']);
  }

  onDelete() {
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
          })
        ).subscribe((res) => {
      console.log('Póliza borrada:', res);
      this.router.navigate(['/verPolizas']);
    });
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
      })).subscribe((res) => {
      (vehiculos: String[]) => {
        this.patentesSugeridas = vehiculos.map(vehiculo => vehiculo);
      }
    });
  }
}
