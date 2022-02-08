import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import { FrecuenciaOpcion } from 'src/app/_model/frecuenciaOpcion';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from "ng-apexcharts";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartsComponent implements OnInit {

  @Input() genReporte?: FrecuenciaOpcion[] = [];
  
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


    this.series = this.arraySer;
    this.chart = {
      width: 300,
      type: "pie"
     }
    this.labels = this.arrayOp;
    this.responsive= [
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

  }
}
