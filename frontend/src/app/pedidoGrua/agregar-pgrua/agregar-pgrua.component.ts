import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PGrua } from 'src/app/models/pgrua';
import { Poliza } from 'src/app/models/poliza';
import { PgruaService } from 'src/app/service/pgrua/pgrua.service';

@Component({
  selector: 'app-agregar-pgrua',
  templateUrl: './agregar-pgrua.component.html',
  styleUrls: ['./agregar-pgrua.component.css']
})
export class AgregarPGruaComponent {

  formularioPoliza: FormGroup;
  polizas: Poliza[] = [];
  date: Date = new Date();

  constructor(private fb: FormBuilder, private pGruaServ: PgruaService)
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
}