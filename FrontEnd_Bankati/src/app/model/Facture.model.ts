import { StatutFacture } from "./enum/StatutFacture.enum";
import { TypeService } from "./enum/TypeService.enum";
import { Fournisseur } from "./Fournisseur.model";

export interface Facture {
  id: number;
  dateEmission: string;
  dateEcheance: string;


  fournisseur: Fournisseur;
  montant: number;
  dateLimite: string;
  statut: StatutFacture;
  type_facture: TypeService;




}
