import { Devise } from './devise.enum';
import { CarteVirtuelle } from './CarteVirtuelle.model';

export interface Portefeuille {
  id: number;
  utilisateurId: number;
  solde: number; // Utilisez `number` pour représenter `BigDecimal` en TypeScript
  devise: Devise;
  cartes: CarteVirtuelle[]; // Liste de cartes associées
}
