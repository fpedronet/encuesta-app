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

import { Sistema } from './../../../_model/sistema';
import { SistemaService } from 'src/app/_service/sistema.service';

@Component({
  selector: 'app-lsistema',
  templateUrl: './lsistema.component.html',
  styleUrls: ['./lsistema.component.css']
})
export class LsistemaComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService : NotifierService,
    private confimService : ConfimService,
    private spinner : SpinnerService,
    private sistemaService : SistemaService,

  ) { }

  dataSource: Sistema[] = [];
  displayedColumns: string[] = ['nIdSistemas', 'cSistemas', 'nAccion'];
  loading = true;
  existRegistro = false;
  countRegistro = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
  }

  ngAfterViewInit(data: string = '') {

    this.sistemaService = new SistemaService(this.http);
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.sistemaService!.listar(
            data,
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

    let data = (event.target as HTMLInputElement).value;
    this.ngAfterViewInit(data);
  }

}
