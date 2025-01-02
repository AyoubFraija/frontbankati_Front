import { Transaction } from './Transaction.model';
import { Compte } from './Compte.model';

export interface PaiementEnLigne extends Transaction {
    fournisseur: string;
    referenceTransaction: string;
    compte: Compte;
}
