import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-totale',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './totale.component.html',
  styleUrl: './totale.component.css'
})
export class TotaleComponent {
  filterGallery(category: string) {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
      if (item instanceof HTMLElement) {
        if (category === 'all' || item.classList.contains(category)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      }
    });

    // Réinitialiser les boutons de filtre
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Activer le bouton du filtre sélectionné
    const activeButton = document.querySelector(`.filter-btn[onclick*="${category}"]`);
    if (activeButton) activeButton.classList.add('active');
  }
  contactForm = {
    name: '',
    email: '',
    website: '',
    message: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.contactForm);
    // Here you can add your form submission logic
  }

  constructor() { }
}
