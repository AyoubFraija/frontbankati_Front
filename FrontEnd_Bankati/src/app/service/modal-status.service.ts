import { Injectable } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalStatusComponent } from '../modal-status/modal-status.component';
import { ModalPlafondComponent } from '../modal-plafond/modal-plafond.component';
import { ModalCarteComponent } from '../modal-carte/modal-carte.component';


@Injectable({
  providedIn: 'root'
})
export class ModalStatusService {

  constructor(private dialog: MatDialog) { }

  openStatusModal(carte: any) {
      this.dialog.open(ModalStatusComponent,{
        width: 'auto',
        height: 'auto', 
        data : {carte : carte}
      });
  }

  closeStatusModal() {
    this.dialog.closeAll();
  }

  openPlafondModal(carte:any){
    this.dialog.open(ModalPlafondComponent,{
      width: 'auto',
      height: 'auto', 
      data : {carte : carte}
    });
  }

  openCarteModal(){
    this.dialog.open(ModalCarteComponent ,{
      width: 'auto',
      height: 'auto', 
    });
  }
  
}

