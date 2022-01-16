import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { NotifierService } from 'src/app/page/component/notifier/notifier.service';
import { Grupo } from 'src/app/_model/grupo';
import { GrupoService } from 'src/app/_service/grupo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private grupoService : GrupoService,
    private snackBar : NotifierService,
  ) { }
  
  form: FormGroup = new FormGroup({});
  id: number = 0;

  ngOnInit(): void { 
    this.form = new FormGroup({
      'nIdGrupo': new FormControl(0),
      'cDescripcion': new FormControl(''),
      'nEstado': new FormControl(0),
      'nNombreEstado': new FormControl(0)
    });

    this.route.params.subscribe((data: Params)=>{
      this.id=data["id"]
      this.obtener();
    });
  }

  obtener(){
    if(this.id!=0 && this.id!=undefined){

      this.grupoService.obtener(this.id).subscribe(data=>{

        this.form = new FormGroup({
          'nIdGrupo': new FormControl(data.nIdGrupo),
          'cDescripcion': new FormControl(data.cDescripcion),
          'nEstado': new FormControl(data.nEstado),
          'nNombreEstado': new FormControl(data.nNombreEstado)
        });

      });      
    }
  }

  guardar(){
    let model = new Grupo();

    model.nIdGrupo= this.form.value['nIdGrupo'];
    model.cDescripcion= this.form.value['cDescripcion'];
    model.nEstado= this.form.value['nEstado'];

    this.grupoService.guardar(model).subscribe(data=>{

      this.router.navigate(['grupo']);
      this.snackBar.showNotification(data.typeResponse!,'Mensaje',data.message!);
      
    });
  }
}