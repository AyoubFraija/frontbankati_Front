import { Compte } from "./Compte.model";
import { FrequencePaiement } from "./enum/FrequencePaiement.enum";
import { Transaction } from "./Transaction.model";


export interface PaiementReccurent extends Transaction {
    compte: Compte;  // Many-to-one relationship with Compte
    frequence: FrequencePaiement;  // Frequency of payment (Enum)
    prochainePaiementDate: Date;  // The next payment date


}
