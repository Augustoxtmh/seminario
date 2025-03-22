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
import { VehiculoService } from 'src/app/service/vehiculo/vehiculo.service';
import { Vehiculo } from 'src/app/models/vehiculo';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

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
    , private vehiculoServ: VehiculoService)
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
      let Cantidad = Number.parseInt(this.formularioCuota.controls["Cantidad"].value)
      let nCuota = Number.parseInt(this.formularioCuota.controls["nCuota"].value)
      let FechaV = this.formularioCuota.controls["FechaV"].value
      let patente: String = '';
      let nombre: String = '';

      try {
        const resPoliza = await firstValueFrom(
          this.polizaServ.getPolizaPorNPoliza(poliza).pipe(
            catchError((err) => {
              console.error(err);
              return [];
            })
          )
        );
    
        if (resPoliza && resPoliza.Patente) {
          patente = resPoliza.Patente;
          console.log(patente);
    
          const resVehiculo = await firstValueFrom(
            this.vehiculoServ.getVehiculoPorPatente(resPoliza.Patente.toString()).pipe(
              catchError((err) => {
                console.error(err);
                return [];
              })
            )
          );
    
          if (resVehiculo) {
            console.log(resVehiculo);
            nombre = resVehiculo.Nombre;
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }

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
        const formato = FechaV.indexOf("/") !== -1 ? "/" : "-";
        const partesFecha = FechaV.split(formato);
        const dia = Number.parseInt(partesFecha[0]);
        const mes = Number.parseInt(partesFecha[1]) - 1;
        const anio = Number.parseInt(partesFecha[2]);
        const fecha = new Date(anio, mes, dia);
    
        let aCuota = nCuota;
    
        const promise = new Promise<void>((resolve, reject) => {
            this.cuotaServ
                .createCuota(new Cuota(aCuota, fecha, Monto, poliza, JSON.parse(localStorage.getItem("User") || '{}').UsuarioId ))
                .pipe(
                    catchError((error) => {
                        console.error(`Error al guardar cuota ${aCuota}:`, error);
                        reject(error);
                        return [];
                    }),
                )
                .subscribe(() => {
                  if(Cantidad > 1){
                    this.agregarDatosAlPDF(aCuota, fecha, Monto, poliza, Cantidad, patente, nombre);
                    Cantidad = Cantidad - 2;
                    aCuota++
                  }
                  if(Cantidad == 1){
                    this.agregarDatosAlPDF(aCuota, fecha, Monto, poliza, Cantidad, patente, nombre);
                    Cantidad--;
                  }
                  resolve();
                });
        });
    
        promises.push(promise);
        nCuota++;
    
        FechaV = this.sumarUnMes(FechaV);
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
    , poliza: string,  totalCuotas: number
    , patente: String, nombre: String) {

    if (totalCuotas > 1) {
      this.doc.addImage('../../../assets/cuotaDoble.jpg', 'JPG', 0, 0, 210, 297);
      this.colocarTexto(nCuota, fecha, Monto, poliza, 31, 22, fecha, patente, nombre);
      nCuota++
      this.colocarTexto(nCuota, fecha, Monto, poliza, 129, 22, fecha, patente, nombre);
    } else {
      this.doc.addImage('../../../assets/cuotaSola.jpg', 'JPG', 0, 0, 210, 297);
      this.colocarTexto(nCuota, fecha, Monto, poliza, 31, 22, fecha, patente, nombre);
    }

    if(totalCuotas>1)
      this.doc.addPage();
    

  }

  colocarTexto(nCuota: number, fecha: Date, Monto: string
    , poliza: string, x: number, y: number, fechaA: Date
    , patente: String, nombre: String)
  {
    
    this.doc.setFontSize(8);
    this.doc.setFont('Helvetica', 'normal');
    
    this.doc.text(fecha.toLocaleDateString(), x + 22, y + 146, { angle: 90 });
    this.doc.text(`${patente}`, x + 11, y + 95, { angle: 90 });
    this.doc.text(`${poliza.toUpperCase()}`, x + 22, y  + 106, { angle: 90 });
    this.doc.text(`${nCuota}`, x + 22, y + 168, { angle: 90 });
    this.doc.text(`${Monto}`, x + 34, y + 100, { angle: 90 });
    this.doc.text(`${fechaA.getDate()+'/'+fechaA.getMonth()+'/'+fechaA.getFullYear()}`, x, y + 95, { angle: 90 });
    this.doc.text(`${nombre.toUpperCase()}`, x + 11, y + 168, { angle: 90 });

    this.doc.text(fecha.toLocaleDateString(), x + 22, y + 241, { angle: 90 });
    this.doc.text(`${patente}`, x + 11, y + 190, { angle: 90 });
    this.doc.text(`${poliza.toUpperCase()}`, x + 22, y  + 201, { angle: 90 });
    this.doc.text(`${nCuota}`, x + 22, y + 263, { angle: 90 });
    this.doc.text(`${Monto}`, x + 34, y + 195, { angle: 90 });
    this.doc.text(`${fechaA.getDate()+'/'+fechaA.getMonth()+'/'+fechaA.getFullYear()}`, x, y + 190, { angle: 90 });
    this.doc.text(`${nombre.toUpperCase()}`, x + 11, y + 263, { angle: 90 });
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
