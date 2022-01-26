import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfimService } from './../../component/confirm/confim.service';
import { NotifierService } from 'src/app/page/component/notifier/notifier.service';
import { SpinnerService } from '../../component/spinner/spinner.service';

import { Encuesta } from './../../../_model/encuesta';
import { EncuestaService } from 'src/app/_service/encuesta.service';

@Component({
  selector: 'app-lencuesta',
  templateUrl: './lencuesta.component.html',
  styleUrls: ['./lencuesta.component.css']
})
export class LencuestaComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService : NotifierService,
    private confimService : ConfimService,
    private spinner : SpinnerService,
    
    private encuestaService : EncuestaService,
  ) { }

  dataSource: Encuesta[] = [];
  displayedColumns: string[] = ['nIdEncuesta', 'cSistemas','cTitulo','cDescripcion','dFechaIni','dFechaFin', 'nAccion'];
  loading = true;
  existRegistro = false;
  countRegistro = 0;

  data? : string;
  
  fechaInicio?: Date;
  fechaSelectInicio?: Date;

  fechaFin?: Date;
  fechaSelectFin?: Date;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
  }

  ngAfterViewInit(data: string='', finicio: Date, ffin: Date) {
    this.encuestaService = new EncuestaService(this.http);
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.encuestaService!.listar(
            data,
            finicio,
            ffin,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.sort.active,
            this.sort.direction,
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(res => {

           this.loading = false;
           this.existRegistro = res === null;

          if (res === null) {
            return [];
          }

          this.countRegistro = res.pagination.total;
          return res.items;
        }),
      ).subscribe(data => (this.dataSource = data));
  }

  applyFilter(event: Event) {
    this.data = (event.target as HTMLInputElement).value;
    let finicio = this.fechaSelectInicio;
    let ffin =  this.fechaSelectFin;
    this.ngAfterViewInit(this.data, finicio!, ffin!);
  }

  onDateChange(){
    let finicio = this.fechaSelectInicio;
    let ffin =  this.fechaSelectFin;
    this.ngAfterViewInit(this.data, finicio!, ffin!);
  }
}
