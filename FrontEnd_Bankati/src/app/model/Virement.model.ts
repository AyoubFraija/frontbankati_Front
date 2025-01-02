import { Compte } from "./Compte.model";
import { Transaction } from "./Transaction.model";


export interface Virement extends Transaction {

    expediteur: Compte;
    destinataire: Compte;
}
