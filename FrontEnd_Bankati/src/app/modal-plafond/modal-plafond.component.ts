import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarteVirtuelleService } from '../service/CarteVirtuelleService.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-plafond',
  standalone: true,
  imports: [],
  templateUrl: './modal-plafond.component.html',
  styleUrl: './modal-plafond.component.css'
})
export class ModalPlafondComponent {
  carte: any;
  plafond:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public carteVirtuelleService: CarteVirtuelleService, public router: Router,public dialog: MatDialog) {
    this.carte = data.carte; 
    this.plafond = data.carte.plafond;
    console.log(this.carte);
  }

  changerPlafond(plafond: any) {
    this.carteVirtuelleService.changerPlafond(this.carte,plafond).subscribe(
      (data) => {
        this.carte = data;
        this.dialog.closeAll();
        this.router.navigateByUrl('/cart');
      }
    );
  }


  updatePlafond(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.plafond = parseInt(inputElement.value, 10);
  }
  
  closeDialog() {
    this.dialog.closeAll();
  }

}
