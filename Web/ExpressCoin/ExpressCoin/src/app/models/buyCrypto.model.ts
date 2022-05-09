import { CryptoSymbol } from "../interfaces/Crypto.interface";
import { User } from "../interfaces/user.interface";

export class BuyCrypto{
    user !: User;
    cryptos !: CryptoSymbol;
    resta !: number;
    price !: number;

    constructor(_user:User, _cryptos : CryptoSymbol, _resta:number, _price : number){
        this.user = _user;
        this.cryptos = _cryptos;
        this.resta = _resta;
        this.price = _price;

    }
}