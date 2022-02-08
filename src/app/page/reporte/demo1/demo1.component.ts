import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";


@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.css']
})
export class Demo1Component implements OnInit {

  series!:ApexAxisChartSeries;
  chart!:ApexChart;
  title!:ApexTitleSubtitle;


  ngOnInit(): void {
   this.initializeChartOptions();
  }

  initializeChartOptions(){
    this.title = {
        text: 'Reporte'
     };

     this.series = [{
       name: 'java1',
       data:[12,10,19]
     }];

     this.chart = {
       type:'line',
       width:450
     }
  }  
}
