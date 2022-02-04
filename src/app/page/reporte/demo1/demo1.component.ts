import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.css']
})
export class Demo1Component implements OnInit {

  constructor() { 
  }
  
  chart: any;
  tipo: string = 'line';

  ngOnInit(): void {
    this.reporte();
  }

  cambiar(tipo: string) {
    this.tipo = tipo;
    if (this.chart != null) {
      this.chart.destroy();
    }
    this.reporte();
  }

  reporte() {
    const labels = ["Enero","Febrero","Marzo","Abril"];
    const data= [65, 59, 80, 81, 56, 55, 40];

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
              // borderColor: [
              //   'rgb(255, 99, 132)',
              //   'rgb(255, 159, 64)',
              //   'rgb(255, 205, 86)',
              //   'rgb(75, 192, 192)',
              //   'rgb(54, 162, 235)',
              //   'rgb(153, 102, 255)',
              //   'rgb(201, 203, 207)'
              // ],
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
