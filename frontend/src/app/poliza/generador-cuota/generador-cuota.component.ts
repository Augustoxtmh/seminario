import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CuotaService } from 'src/app/service/cuota/cuota.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Poliza } from 'src/app/models/poliza';
import { Cuota } from 'src/app/models/cuota';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import { PolizaService } from 'src/app/service/poliza/poliza.service';

@Component({
  selector: 'app-generador-cuota',
  templateUrl: './generador-cuota.component.html',
  styleUrls: ['./generador-cuota.component.css']
})
export class GeneradorCuotaComponent {
  polizaRecibida: Poliza;
  formularioCuota: FormGroup;
  polizas: Poliza[] = [];
  date: Date = new Date();
  doc = new jsPDF();

  constructor(private fb: FormBuilder, private cuotaServ: CuotaService
    , private router: Router, private polizaServ: PolizaService
  )
  {
    const navigation = this.router.getCurrentNavigation();
    this.polizaRecibida = navigation?.extras.state?.['poliza'];

    const fechaV = this.polizaRecibida?.Vigencia ? new Date(this.polizaRecibida.Vigencia) : new Date();
    fechaV.setMonth(fechaV.getMonth() + 2);

    this.formularioCuota = this.fb.group({
      poliza: [
        this.polizaRecibida?.NumeroPoliza,
        [Validators.required, Validators.minLength(7)],
      ],
      nCuota: [
        '0',
        [Validators.required, Validators.maxLength(1)],
      ],
      Cantidad: [
        '1',
        [Validators.required, Validators.maxLength(1)],
      ],
      FechaV: [
        fechaV.getDate()+'/'+fechaV.getMonth()+'/'+fechaV.getFullYear(),
        [Validators.required],
      ],
      Monto: [
        '',
        [Validators.required],
      ]}
    )
  }

  async onSubmit() {
    if (this.formularioCuota.valid) {
      const Monto = this.formularioCuota.controls["Monto"].value
      const poliza = this.formularioCuota.controls["poliza"].value
      const idUsuario = Number(this.polizaRecibida.UsuarioId)
      const Cantidad = Number.parseInt(this.formularioCuota.controls["Cantidad"].value)
      let nCuota = Number.parseInt(this.formularioCuota.controls["nCuota"].value)
      let FechaV = this.formularioCuota.controls["FechaV"].value
      let patente: String = '';

      this.polizaServ.getPolizaPorNPoliza(poliza).pipe(
        catchError((err) => {
          console.error(err)
          return []
        }),
      ).subscribe((res: Poliza)=> {
        console.log(res.Patente + 'ACA' + res.Vigencia)
        patente = res.Patente
      })

      if (nCuota < 0 || nCuota > 5 || Cantidad == 0 || FechaV == "" || Monto == "" || poliza == "") {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Todos los campos son requeridos",
          showConfirmButton: false,
          timer: 1500,
          width: "25vw",
          padding: "20px",
        })
        return
      }

      if (nCuota + Cantidad > 6) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "El número de cuota superará el máximo",
          showConfirmButton: false,
          timer: 1500,
          width: "25vw",
          padding: "20px",
        })
        return
      }

      const promises = []

      for (let index = 0; index < Cantidad; index++) {
        const formato = FechaV.indexOf("/") !== -1 ? "/" : "-"
        const partesFecha = FechaV.split(formato)
        const dia = Number.parseInt(partesFecha[0])
        const mes = Number.parseInt(partesFecha[1]) - 1
        const anio = Number.parseInt(partesFecha[2])
        const fecha = new Date(anio, mes, dia)

        const currentCuota = nCuota

        const promise = new Promise<void>((resolve, reject) => {
          this.cuotaServ
            .createCuota(new Cuota(currentCuota, fecha, Monto, poliza, idUsuario))
            .pipe(
              catchError((error) => {
                console.error(`Error al guardar cuota ${currentCuota}:`, error)
                reject(error)
                return []
              }),
            )
            .subscribe(() => {
              console.log(patente + 'ACA')
              this.agregarDatosAlPDF(currentCuota, fecha, Monto, poliza, index, Cantidad, fecha, patente);
              resolve()
            })
        })

        promises.push(promise)
        nCuota++
        FechaV = this.sumarUnMes(FechaV)
      }

      try {
        
        await Promise.all(promises)
        this.generarDocumentoPDF()

      } catch (error) {
        console.error("Error al procesar las cuotas:", error)
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al procesar las cuotas",
          showConfirmButton: false,
          timer: 1500,
          width: "25vw",
          padding: "20px",
        })
      }
    }
  }

  generarDocumentoPDF() {
    console.log("guardando")
    this.doc.save("Cupon_Pago.pdf")
    this.doc = new jsPDF()
  }

  agregarDatosAlPDF(nCuota: number, fecha: Date, Monto: string
    , poliza: string, index: number, totalCuotas: number, fechaA: Date
    , patente: String) {
    console.log(patente);

    let cliente = "Juan Pérez"; 

    if (totalCuotas - index > 1) {
        this.doc.addImage('../../../assets/cuotaDoble.jpg', 'JPG', 0, 0, 210, 297);
        this.doc.addPage();
    } else {
        this.doc.addImage('../../../assets/cuotaSola.jpg', 'JPG', 0, 0, 210, 297);
    }

    let x = 31, y = 22;

    this.doc.setFontSize(8);
    this.doc.setFont('Helvetica', 'normal');
    
    this.doc.text(fecha.toLocaleDateString(), x + 22, y + 146, { angle: 90 });
    this.doc.text(`${patente}`, x + 11, y + 95, { angle: 90 });
    this.doc.text(`${poliza.toUpperCase()}`, x + 22, y  + 106, { angle: 90 });
    this.doc.text(`${nCuota}`, x + 22, y + 168, { angle: 90 });
    this.doc.text(`${Monto}`, x + 34, y + 94, { angle: 90 });
    this.doc.text(`${fechaA.getDate()+'/'+fechaA.getMonth()+'/'+fechaA.getFullYear()}`, x, y + 95, { angle: 90 });
    this.doc.text(`${cliente.toUpperCase()}`, x + 11, y + 168, { angle: 90 });

  }
  
  esBisiesto(anio: number): boolean {
    return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
  }

  sumarUnMes(fecha: string): string {
    const dias_meses = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const formato = fecha.indexOf('/') !== -1 ? '/' : '-';
    const partesFecha = fecha.split(formato);
    let dia = parseInt(partesFecha[0]);
    let mes = parseInt(partesFecha[1]);
    let anio = parseInt(partesFecha[2]);
    
    mes++;
    if (mes === 13) {
      mes = 1;
      anio++;
    }
    if (dia >= dias_meses[mes - 1]) {
      dia = dias_meses[mes]
      if (mes == 2 && this.esBisiesto(anio)) {
        dia = 29;
      }
      if (mes == 1) {
        dia = 31
      }
    }

    if (mes === 3 && this.esBisiesto(anio) && dia == 29) {
      dia = 31;
    }
    
    const nuevaFecha = `${dia < 10 ? '0' + dia : dia}${formato}${mes < 10 ? '0' + mes : mes}${formato}${anio}`;
    return nuevaFecha;
  }
}
