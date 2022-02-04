import { Component, Input, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import { FrecuenciaOpcion } from 'src/app/_model/frecuenciaOpcion';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() genReporte?: FrecuenciaOpcion[] = [];
  
  constructor() { }

  chart: any;
  tipo: string = 'line';
  label: string[] = [];
  prueba?: string;

  ngOnInit(): void {
    this.reporte();
  }

  reporte(){

    debugger;
    const labels =["Lunes","Marte","Miercole","Jueves","Vierne"]
    const data =[65, 59, 80, 81, 56, 55, 40];

    this.prueba ="Hola Mundo";    

    this.chart = new Chart('canvas', {
      type: this.tipo,
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Cantidad',
            data: data,
             borderColor: "#3cba9f",
            fill: false,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 0, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true
            }
          }],
        }
      }
    });

  }

}
