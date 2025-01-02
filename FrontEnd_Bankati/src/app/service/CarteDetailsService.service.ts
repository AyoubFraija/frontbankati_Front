import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarteDetailsService {
  private carte: any;
  private couleur: any;

  setCarte(carte: any) {
    this.carte = carte;
  }

  getCarte() {
    return this.carte;
  }

  setCouleur(couleur: any) {
    this.couleur = couleur;
  }
  getCouleur() {
    return this.couleur;
  }
}