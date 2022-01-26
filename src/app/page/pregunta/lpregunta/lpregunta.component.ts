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
import { environment } from 'src/environments/environment';

import { Pregunta } from './../../../_model/pregunta';
import { PreguntaService } from 'src/app/_service/pregunta.service';

@Component({
  selector: 'app-lpregunta',
  templateUrl: './lpregunta.component.html',
  styleUrls: ['./lpregunta.component.css']
})
export class LpreguntaComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService : NotifierService,
    private confimService : ConfimService,
    private spinner : SpinnerService,
    private preguntaService : PreguntaService,

    ) { }

    dataSource: Pregunta[] = [];
    displayedColumns: string[] = ['nIdPregunta', 'cDescripcion', 'cGrupo', 'nTipo', 'nAccion'];
    loading = true;
    existRegistro = false;
    countRegistro = 0;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    ngOnInit(): void {
    }
  
    ngAfterViewInit(data: string = '', grupo: number = 0, tipo: number = 0) {
  
      this.preguntaService = new PreguntaService(this.http);
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.loading = true;
            return this.preguntaService!.listar(
              data,
              grupo,
              tipo,
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
            else{
              res.items.forEach(item => {
                var preg = item as Pregunta
                preg.cTipo = environment.listaTipo.find(e => e.nIdTipo === preg.nTipo)?.cDescripcion;
              });
            }
  
            this.countRegistro = res.pagination.total;
            return res.items;
          }),
        ).subscribe(data => (this.dataSource = data));
    }
  
    applyFilter(event: Event) {
  
      let data = (event.target as HTMLInputElement).value;
      this.ngAfterViewInit(data);
    }

    tipoDescripcion(nTipo: number){
      return 0;
    }
  }
  