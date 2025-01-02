import { Devise } from "./devise.enum";
import { StatutCarteVirtuelle } from "./StatutCarteVirtuelle.enum";

export interface CarteVirtuelle {
    numeroCarte: number;
    dateExpiration: Date;
    solde: number;
    cvv: number;
    devise: Devise;
    statut: StatutCarteVirtuelle;
    portefeuilleId: number;
    plafond: number; 
    solde_init: number;
    color: number;
  }
