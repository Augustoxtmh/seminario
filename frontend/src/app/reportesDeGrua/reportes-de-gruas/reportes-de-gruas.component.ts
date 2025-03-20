import { Component } from "@angular/core";import { ChartOptions, ChartType, ChartDataset } from "chart.js";
import { catchError } from "rxjs";
import { PGrua } from "src/app/models/pgrua";
import { PgruaService } from "src/app/service/pgrua/pgrua.service";
import Swal from "sweetalert2";


@Component({
  selector: 'app-reportes-de-gruas',
  templateUrl: './reportes-de-gruas.component.html',
  styleUrls: ['./reportes-de-gruas.component.css']
})
export class ReportesDeGruasComponent {
  pGrua: PGrua[] = [];

  constructor(private pGruaServ: PgruaService) {}
}
