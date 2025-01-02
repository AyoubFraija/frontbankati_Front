import { Devise } from './devise.enum';

export interface CryptoWalletDTO {
    utilisateurId: number | null;
    devise: Devise | null;
    solde: number | null ;
    mdp: string | null;

}