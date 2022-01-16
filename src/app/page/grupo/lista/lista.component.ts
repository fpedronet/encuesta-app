import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { NotifierService } from 'src/app/page/component/notifier/notifier.service';
import { Grupo } from 'src/app/_model/grupo';
import { GrupoService } from 'src/app/_service/grupo.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(
    private gruposervice : GrupoService,
    private snackBar : NotifierService,
    ) { }

  dataSource : MatTableDataSource<Grupo> = new MatTableDataSource();
  displayedColumns: string[] = ['nIdGrupo', 'cDescripcion', 'nEstado', 'nAccion'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.gruposervice.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(id:number){
    this.gruposervice.eliminar(id).subscribe(data=>{

      this.gruposervice.listar().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });

       this.snackBar.showNotification(data.typeResponse!,'Mensaje',data.message!);

    });
  }
}
