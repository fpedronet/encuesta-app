import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmComponent } from './confirm.component';


@Injectable({
  providedIn: 'root'
})
export class ConfimService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg: string){
  return this.dialog.open(ConfirmComponent,{
      width:'430px',
      disableClose:true,
      data:{
        message: msg
      }
    });
  }
}
