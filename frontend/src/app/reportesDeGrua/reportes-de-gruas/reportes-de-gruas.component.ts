import { Component, OnInit } from '@angular/core';
import { PGrua } from 'src/app/models/pgrua';
import { PgruaService } from 'src/app/service/pgrua/pgrua.service';

@Component({
  selector: 'app-reportes-de-gruas',
  templateUrl: './reportes-de-gruas.component.html',
  styleUrls: ['./reportes-de-gruas.component.css']
})
export class ReportesDeGruasComponent implements OnInit {
  pedidosPorDia = {
    title: { text: 'Pedidos por Día' },
    tooltip: { trigger: 'axis' },
    xAxis: { 
      type: 'category', 
      data: [] as string[]
    },
    yAxis: { type: 'value' },
    series: [
      { 
        name: 'Pedidos', 
        type: 'bar', 
        data: [] as number[]
      }
    ]
  };

  constructor(private pedidoGruaServ: PgruaService) {}

  ngOnInit(): void {
    this.pedidoGruaServ.getAllPedidogrua().subscribe((data: PGrua[]) => {
      this.processData(data);
    });
  }

  processData(data: PGrua[]): void {
    const dates: string[] = [];
    const pedidos: number[] = [];

    data.forEach(pedido => {
      const fecha = new Date(pedido.FechaHoraPedido).toLocaleDateString();
      if (!dates.includes(fecha)) {
        dates.push(fecha);
        pedidos.push(1);
      } else {
        const index = dates.indexOf(fecha);
        pedidos[index] += 1;
      }
    });

    this.pedidosPorDia.xAxis.data = dates;
    this.pedidosPorDia.series[0].data = pedidos;
  }

  onBarClick(event: any) {
    console.log('Día seleccionado:', event.name);
  }
}
