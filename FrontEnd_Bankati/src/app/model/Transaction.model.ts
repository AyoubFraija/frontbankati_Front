import { StatutTransaction } from "./enum/StatutTransaction.enum";
import { TypeTransaction } from "./enum/TypeTransaction.enum";

export class Transaction {
    id?: number;                // Identifiant unique de la transaction
    montant?: number;           // Montant de la transaction
    date?: Date;                // Date de la transaction
    idUser?: number;            // Identifiant de l'utilisateur associé
    statutTransaction?: StatutTransaction; // Statut de la transaction
    typeTransaction?: TypeTransaction;     // Type de la transaction
  }
  