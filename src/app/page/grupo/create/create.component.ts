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
    private notifierService : NotifierService,
  ) { }
  
  form: FormGroup = new FormGroup({});
  id: number = 0;
  ver: boolean = false;

  ngOnInit(): void { 
    this.form = new FormGroup({
      'nIdGrupo': new FormControl({ value: '###', disabled: true }),
      'cDescripcion': new FormControl({ value: '', disabled: false })
    });

    this.route.params.subscribe((data: Params)=>{
      this.id = data["id"]
      this.ver = (data["ver"]=='true')? true : false
      this.obtener();
    });
  }

  obtener(){
    if(this.id!=0 && this.id!=undefined){

      this.grupoService.obtener(this.id).subscribe(data=>{

        this.form = new FormGroup({
          'nIdGrupo': new FormControl({ value: data.nIdGrupo, disabled: true }),
          'cDescripcion': new FormControl({ value: data.cDescripcion, disabled: this.ver })
        });

      });      
    }
  }

  guardar(){
    let model = new Grupo();

    model.nIdGrupo= this.form.value['nIdGrupo'];
    model.cDescripcion= this.form.value['cDescripcion'];

    this.grupoService.guardar(model).subscribe(data=>{

      this.router.navigate(['grupo']);
      this.notifierService.showNotification(data.typeResponse!,'Mensaje',data.message!);
      
    });
  }
}