import { Component } from '@angular/core';
import { CryptoWalletDTO } from '../model/CryptoWalletDTO';
import { Devise } from '../model/devise.enum';
import { FormsModule } from '@angular/forms';
import { CryptoWalletServiceService } from '../service/crypto-wallet-service.service';
@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css'
})
export class CardFormComponent {
  mdp: any;
  somme: any;
  devise:any;
  cryptoWalletDTO: CryptoWalletDTO = {
    "utilisateurId": 1,
    "mdp": null,
    "solde": null,
    "devise": null
  };
  constructor(private cryptoWalletService: CryptoWalletServiceService) {}
   creer(somme:number,devise:string,mdp:string): any {
      if (devise == "BTC") {
        this.devise = Devise.BTC;
      } else if (devise == "ETH") {
        this.devise = Devise.ETH;
      }
      console.log(somme,devise);
      this.cryptoWalletDTO.solde = somme;
      this.cryptoWalletDTO.devise = this.devise;
      this.cryptoWalletDTO.utilisateurId = 1;
      this.cryptoWalletDTO.mdp = mdp;
      this.cryptoWalletService.genererCryptoWallet(this.cryptoWalletDTO).subscribe(
        (data) => {
          return data;
        }
      );
    }
}
