import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FrecuenciaOpcion } from 'src/app/_model/frecuenciaOpcion';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: any;
  chart: any;
  responsive: any;
  labels: any;
};


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  @Input() genReporte?: FrecuenciaOpcion[] = [];
  
  constructor() { }

  arrayOp: string[] = [];
  arraySer: number[] = [];

  ngOnInit(): void {
    this.initializeChartOptions();
  }

  
  initializeChartOptions2(){
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  initializeChartOptions(){
    let listaReporte = this.genReporte?.filter(y=>y.frecuenciaAbs! != 0);

    let opcion = listaReporte?.map(y=>y.opcion);

    let frecuencia = listaReporte?.map(y=>y.frecuenciaAbs);

    opcion?.forEach(x=>{
      this.arrayOp.push(x!);
    });

    frecuencia?.forEach(x=>{
      this.arraySer.push(x!);
    });


    this.chartOptions = {
      series: this.arraySer,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: this.arrayOp,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
