import { Devise } from './devise.enum';
export interface CryptoWallet {
    id: number;
    utilisateurId: number;
    solde: number;
    devise: Devise;
    mdp: string;
}