import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PGrua } from 'src/app/models/pgrua';
import { Poliza } from 'src/app/models/poliza';
import { GrueroService } from 'src/app/service/gruero/gruero.service';
import { PgruaService } from 'src/app/service/pgrua/pgrua.service';
import { VehiculoService } from 'src/app/service/vehiculo/vehiculo.service';

@Component({
  selector: 'app-agregar-pgrua',
  templateUrl: './agregar-pgrua.component.html',
  styleUrls: ['./agregar-pgrua.component.css']
})
export class AgregarPGruaComponent {

  patentesSugeridas: String[] = [];
  grueroSugerido: String[] = [];
  formularioPoliza: FormGroup;
  polizas: Poliza[] = [];
  date: Date = new Date();

  constructor(private fb: FormBuilder, private pGruaServ: PgruaService,
      private vehiculoServ: VehiculoService, private grueroServ: GrueroService)
  {
    this.formularioPoliza = this.fb.group({
      gruero: [
        '',
        [Validators.required]
      ],
      nCliente: [
        '',
        [Validators.required],
      ],
      fecha: [
        '',
        [Validators.required],
      ],
      patente: [
        '',
        [Validators.required],
      ],}
    )
  }

  onSubmit() {
    console.log('creando');

    const gruero = (this.formularioPoliza.controls['gruero'].value).GrueroID;
    const nombreCliente = this.formularioPoliza.controls['nCliente'].value;
    const fecha = this.formularioPoliza.controls['fecha'].value;
    const patente = this.formularioPoliza.controls['patente'].value;

    this.pGruaServ.createPedidogrua(new PGrua(nombreCliente, fecha, patente, true, gruero, 1)
    ).subscribe((res) => {
      console.log('Pedido creado:', res);
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
    this.vehiculoServ.getVehiculosPorPatente(query).subscribe(
      (vehiculos: String[]) => {
        this.patentesSugeridas = vehiculos.map(vehiculo => vehiculo);
      }
    );
  }

  onGrueroInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();
  
    if (value.length > 2) {
      this.buscarGrueros(value);
    } else {
      this.grueroSugerido = [];
    }
  }
  
  buscarGrueros(value: string) {
    this.grueroServ.getAllGrueros().subscribe(
      (grueros) => {
        this.grueroSugerido = grueros
          .map(gruero => gruero.NombreGruero)
          .filter(nombre => nombre.toLowerCase().includes(value.toLowerCase())); // Filtramos los nombres que coinciden con lo ingresado
      }
    );
  }
  
  setValueGruero(nombre: String) {
    this.formularioPoliza.controls['gruero'].setValue(nombre);
    this.grueroSugerido = [];
  }  
}