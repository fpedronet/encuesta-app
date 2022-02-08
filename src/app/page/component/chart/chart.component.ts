import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { FrecuenciaOpcion } from 'src/app/_model/frecuenciaOpcion';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexNonAxisChartSeries
} from "ng-apexcharts";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartsComponent implements OnInit {

  @Input() genReporte?: FrecuenciaOpcion[] = [];
  // public chartOptions: Partial<ChartOptions>;

  constructor() { }

  series!: ApexNonAxisChartSeries;
  chart!: ApexChart;
  responsive!: ApexResponsive[];
  labels: any;
  
  arrayOp: string[] = [];
  arraySer: number[] = [];

  ngOnInit(): void {
    this.initializeChartOptions();
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


    this.labels = this.arrayOp;

    this.series = this.arraySer;

    this.chart = {
      width: 300,
      type: "pie"
     }

    this.responsive= [
      {
        breakpoint: 800,
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

  }
}
