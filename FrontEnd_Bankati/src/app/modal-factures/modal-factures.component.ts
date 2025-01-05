import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-factures',
  standalone: true,
  //imports: [],
  imports: [CommonModule],
  templateUrl: './modal-factures.component.html',
  styleUrl: './modal-factures.component.css'
})
export class ModalFacturesComponent {

  @Input() facture: any;

  payerFacture(facture: any): void {
    console.log('Paying facture:', facture);
  }

}
