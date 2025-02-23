import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Poliza } from 'src/app/models/poliza';

@Component({
  selector: 'app-ver-poliza',
  templateUrl: './ver-poliza.component.html',
  styleUrls: ['./ver-poliza.component.css']
})
export class VerPolizaComponent {
  polizaRecibida?: Poliza;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.polizaRecibida = navigation?.extras.state?.['poliza'];

    console.log(this.polizaRecibida)
  }
}
