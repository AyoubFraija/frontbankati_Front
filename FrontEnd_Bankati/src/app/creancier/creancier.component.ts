import {Component, HostListener} from '@angular/core';
import jsPDF from "jspdf";
import {CommonModule, NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-creancier',
  standalone: true,
    imports: [
      CommonModule,
      NgClass,
      FormsModule
    ],
  templateUrl: './creancier.component.html',
  styleUrl: './creancier.component.css'
})
export class CreancierComponent {
  isFactureVisible = true;
  isHistoriqueVisible = false;
  isButtonVisible: boolean = true;

  creanciers = [
    { nom: 'Creancier 1', service: 'Service 1' },
    { nom: 'Creancier 2', service: 'Service 2' },
    { nom: 'Creancier 3', service: 'Service 3' }
  ];

  historiquePaiement = [
    { nom: 'John', prenom: 'Doe', montant: 100, creancier: 'Creancier 1', date: '2024-12-01', userId: 'user1' },
    { nom: 'Jane', prenom: 'Smith', montant: 200, creancier: 'Creancier 2', date: '2024-12-05', userId: 'user2' },
    { nom: 'John', prenom: 'Doe', montant: 150, creancier: 'Creancier 3', date: '2024-12-10', userId: 'user1' }
  ];

  currentUser = { id: 'user1', name: 'John Doe' };

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollPosition = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (scrollPosition + windowHeight >= pageHeight - 50) {
      this.isButtonVisible = false;
    } else {
      this.isButtonVisible = true;
    }
  }

  showFacture() {
    this.isFactureVisible = true;
    this.isHistoriqueVisible = false;
  }

  showHistorique() {
    this.isFactureVisible = false;
    this.isHistoriqueVisible = true;
  }

  getHistoriqueForUser() {
    return this.historiquePaiement.filter(paiement => paiement.userId === this.currentUser.id);
  }

  getImageUrl(nom: string) {
    const imageMap = {
      'Creancier 1': 'assets/OIP.jpg',
      'Creancier 2': 'assets/OIP1.jpg',
      'Creancier 3': 'assets/redal.jpg'
    };
    // @ts-ignore
    return imageMap[nom] || 'assets/bank.jpg';
  }

  isPayFormVisible = false;
  selectedCreancierNom: string | null = null;
  montant: number = 0;

  openPayForm(creancierNom: string) {
    this.selectedCreancierNom = creancierNom;
    this.isPayFormVisible = true;
  }

  closePayForm() {
    this.isPayFormVisible = false;
    this.selectedCreancierNom = null;
    this.montant = 0;
  }

  submitPayForm() {
    if (!this.selectedCreancierNom || this.montant <= 0) {
      alert("Veuillez saisir un montant valide.");
      return;
    }

    alert(`Paiement de ${this.montant}€ effectué pour ${this.selectedCreancierNom}`);

    console.log('Calling generatePdf...'); // Debug log
    this.generatePdf();

    this.closePayForm();
  }

  // Méthode pour générer un fichier PDF
  generatePdf() {
    try {
      console.log('Generating PDF...'); // Debug log
      const doc = new jsPDF();
      const date = new Date().toLocaleDateString();

      doc.setFontSize(16);
      doc.text('Facture de Paiement', 20, 20);
      doc.setFontSize(12);
      doc.text(`Créancier : ${this.selectedCreancierNom}`, 20, 40);
      doc.text(`Montant : ${this.montant} €`, 20, 50);
      doc.text(`Date : ${date}`, 20, 60);

      doc.save(`Facture_${this.selectedCreancierNom}_${date}.pdf`);
      console.log('PDF generated and saved.'); // Debug log
    } catch (error) {
      console.error('Error generating PDF:', error); // Debug log for errors
    }
  }
}
