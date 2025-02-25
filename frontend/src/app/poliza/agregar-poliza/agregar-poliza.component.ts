import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { PolizaService } from 'src/app/service/poliza/poliza.service';
import { VehiculoService } from 'src/app/service/vehiculo/vehiculo.service';
import { Poliza } from 'src/app/models/poliza';
import { Vehiculo } from 'src/app/models/vehiculo';

@Component({
  selector: 'app-agregar-poliza',
  templateUrl: './agregar-poliza.component.html',
  styleUrls: ['./agregar-poliza.component.css']
})
export class AgregarPolizaComponent {

  formularioPoliza: FormGroup;
  patentesSugeridas: String[] = [];
  date: Date = new Date();

  constructor(
    private fb: FormBuilder, 
    private polizaServ: PolizaService,
    private router: Router,
    private vehiculoServ: VehiculoService
  ) {
    this.formularioPoliza = this.fb.group({
      poliza: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      patente: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log('creando');
  
    const poliza = this.formularioPoliza.value.poliza;
    const telefono = this.formularioPoliza.value.telefono;
    const patente = this.formularioPoliza.value.patente;
    const date = new Date();

    this.polizaServ.createPoliza(new Poliza(poliza, telefono, patente, date, 1)).subscribe((res) => {
      console.log('Póliza creada:', res);
      const navigationExtras: NavigationExtras = { state: { poliza: res } };
      this.router.navigate(['/verPoliza'], navigationExtras);
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
    this.patentesSugeridas = []; // Oculta la lista al seleccionar una opción
  }  

  buscarPatentes(query: string) {
    this.vehiculoServ.getVehiculosPorPatente(query).subscribe(
      (vehiculos: String[]) => {
        this.patentesSugeridas = vehiculos.map(vehiculo => vehiculo);
      }
    );
  }
}
