import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
    private router: Router,
    private snackBar: MatSnackBar,
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
      
      this.snackBar.open(data.message!,'Mensaje',{
        duration:2000, 
        horizontalPosition: 'center',
        verticalPosition: 'bottom',        
      });

    });
  }
}
