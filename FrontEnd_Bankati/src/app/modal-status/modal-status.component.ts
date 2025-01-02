import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarteVirtuelleService } from '../service/CarteVirtuelleService.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-status',
  standalone: true,
  templateUrl: './modal-status.component.html',
  styleUrl: './modal-status.component.css'
})
export class ModalStatusComponent {
  carte: any;
  statut: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public carteVirtuelleService: CarteVirtuelleService, public router: Router,public dialog: MatDialog) {
    this.carte = data.carte; 
    console.log(this.carte);
  }

  toggleCardStatus() {
    this.statut = this.carte.statut;

    if (this.statut === 'ACTIVE'){
       this.carteVirtuelleService.desactiver(this.carte).subscribe(
          (data) => {
            this.carte = data;
            this.dialog.closeAll();
            this.router.navigateByUrl('/cart');
          }
        );
    } else {
      this.carteVirtuelleService.activer(this.carte).subscribe(
        (data) => {
          this.carte = data;
          this.dialog.closeAll();
          this.router.navigateByUrl('/cart');
        }
      );
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
