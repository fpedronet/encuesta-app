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

import { Grupo } from './../../../_model/grupo';
import { GrupoService } from 'src/app/_service/grupo.service';

@Component({
  selector: 'app-lgrupo',
  templateUrl: './lgrupo.component.html',
  styleUrls: ['./lgrupo.component.css']
})
export class LgrupoComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService : NotifierService,
    private confimService : ConfimService,
    private spinner : SpinnerService,
    
    private grupoService : GrupoService,

    ) { }

    dataSource: Grupo[] = [];
    displayedColumns: string[] = ['nIdGrupo', 'cDescripcion', 'nAccion'];
    loading = true;
    existRegistro = false;
    countRegistro = 0;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    ngOnInit(): void {
    }
  
    ngAfterViewInit(data: string = '') {
  
      this.grupoService = new GrupoService(this.http);
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.loading = true;
            return this.grupoService!.listar(
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
  
    eliminar(id:number){
  
      this.confimService.openConfirmDialog("Estás segura de eliminar este registro?").afterClosed().subscribe(res =>{
        if(res){
          this.spinner.showLoading();
          this.grupoService.eliminar(id).subscribe(data=>{
  
              this.ngAfterViewInit("");
              this.notifierService.showNotification(data.typeResponse!,'Mensaje',data.message!);
              this.spinner.hideLoading();
          });
        }
      });
    }
  }
  