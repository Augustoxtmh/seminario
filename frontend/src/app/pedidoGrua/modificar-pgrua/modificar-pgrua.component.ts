import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gruero } from 'src/app/models/gruero';
import { PGrua } from 'src/app/models/pgrua';
import { Poliza } from 'src/app/models/poliza';
import { GrueroService } from 'src/app/service/gruero/gruero.service';
import { PgruaService } from 'src/app/service/pgrua/pgrua.service';
import { VehiculoService } from 'src/app/service/vehiculo/vehiculo.service';

@Component({
  selector: 'app-modificar-pgrua',
  templateUrl: './modificar-pgrua.component.html',
  styleUrls: ['./modificar-pgrua.component.css']
})
export class ModificarPGruaComponent {

  patentesSugeridas: String[] = [];
  grueroSugerido: String[] = [];
  formularioPoliza: FormGroup;
  polizas: Poliza[] = [];
  pedidoGruaRecibido: PGrua;
  date: Date = new Date();

  constructor(private fb: FormBuilder, private pGruaServ: PgruaService,
      private vehiculoServ: VehiculoService, private grueroServ: GrueroService,
      private router: Router)
  {
    const navigation = this.router.getCurrentNavigation();
    this.pedidoGruaRecibido = navigation?.extras.state?.['pgrua'];
    
    const gruero = navigation?.extras.state?.['grueroN'];;

    this.formularioPoliza = this.fb.group({
      gruero: [
        gruero,
        [Validators.required]
      ],
      nCliente: [
        this.pedidoGruaRecibido.NombreCliente,
        [Validators.required],
      ],
      fecha: [
        this.pedidoGruaRecibido.FechaHoraPedido,
        [Validators.required],
      ],
      patente: [
        this.pedidoGruaRecibido.Patente,
        [Validators.required],
      ],}
    )
  }

  onSave() {
    console.log('guardando');

    const gruero = this.formularioPoliza.controls['gruero'].value;
    const nombreCliente = this.formularioPoliza.controls['nCliente'].value;
    const fecha = this.formularioPoliza.controls['fecha'].value;
    const patente = this.formularioPoliza.controls['patente'].value;
    const formato = fecha.indexOf('/') !== -1 ? '/' : '-';
    const partesFecha = fecha.split(formato);
    let grueroId: Number = 0;
    let fechaE: Date = new Date();

    const anio = parseInt(partesFecha[0]);
    const mes = parseInt(partesFecha[1]);
    const dia = parseInt(partesFecha[2]);

    fechaE.setDate(dia);
    fechaE.setMonth(mes - 1);
    fechaE.setFullYear(anio);

    this.grueroServ.getGrueroPorNombre(gruero).subscribe((res: Gruero) => {

      grueroId = res.GrueroID ?? 0;

      this.pGruaServ.updatePedidogrua(new PGrua(nombreCliente, fechaE, patente, true, grueroId, 1)
      ).subscribe((res) => {
        console.log('Pedido guardado:', res);
      });
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
          .filter(nombre => nombre.toLowerCase().includes(value.toLowerCase()));
      }
    );
  }
  
  setValueGruero(nombre: String) {
    this.formularioPoliza.controls['gruero'].setValue(nombre);
    this.grueroSugerido = [];
  }

  onBack()
  {
    this.pedidoGruaRecibido = new PGrua('', new Date(), '', true, 0, 0)
    this.router.navigate(['/verPedidosDeGrua']);
  }

  onDelete()
  {
    this.pGruaServ.deletePedidogrua(this.pedidoGruaRecibido).subscribe(() => {
      this.onBack()
      this.router.navigate(['/verPedidosDeGrua']);
    });
  }
}
