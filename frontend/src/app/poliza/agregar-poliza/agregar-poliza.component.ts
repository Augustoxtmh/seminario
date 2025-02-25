import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Poliza } from 'src/app/models/poliza';
import { PolizaService } from 'src/app/service/poliza/poliza.service';

@Component({
  selector: 'app-agregar-poliza',
  templateUrl: './agregar-poliza.component.html',
  styleUrls: ['./agregar-poliza.component.css']
})
export class AgregarPolizaComponent {

  formularioPoliza: FormGroup;
  polizas: Poliza[] = [];
  date: Date = new Date();

  constructor(private fb: FormBuilder, private polizaServ: PolizaService
    , private router: Router
  )
  {
    this.formularioPoliza = this.fb.group({
      poliza: [
        '',
        [Validators.required],
      ],
      telefono: [
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
  
    const poliza = this.formularioPoliza.controls['poliza'].value;
    const telefono = this.formularioPoliza.controls['telefono'].value;
    const patente = this.formularioPoliza.controls['patente'].value;
    const date = new Date();

    this.polizaServ.createPoliza(new Poliza(poliza, telefono, patente, date, 0)).subscribe((res) => {
      console.log('Póliza creada:', res);
  
      const navigationExtras: NavigationExtras = {
        state: { poliza: res }
      };
  
      this.router.navigate(['/verPoliza'], navigationExtras);
    });
  } 
}
