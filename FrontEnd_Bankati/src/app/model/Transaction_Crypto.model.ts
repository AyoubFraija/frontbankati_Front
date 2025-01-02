import {TransactionCrypto_Type} from './TransactionCryptoType.enum'
export interface TransactionCrypto {
    transaction_id: number;
    montant_acheter: number;
    montant_vendre: number;
    montant_envoyer: number;
    montant_recevoir: number;
    type_transaction: TransactionCrypto_Type;
    date_transaction: Date;
    wallet_emetteur: number;
    wallet_recepteur: number;
}