import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarteVirtuelleService } from '../service/CarteVirtuelleService.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-carte',
  standalone: true,
  imports: [],
  templateUrl: './modal-carte.component.html',
  styleUrl: './modal-carte.component.css'
})
export class ModalCarteComponent {
    constructor(public carteVirtuelleService: CarteVirtuelleService, public router: Router,public dialog: MatDialog){}
    closeDialog() {
      this.dialog.closeAll();
    }
}
