import { Compte } from "./Compte.model";
import { Facture } from "./Facture.model";
import { Transaction } from "./Transaction.model";

export interface PaiementFacture extends Transaction {

    facture: Facture;
    compte: Compte;
}
