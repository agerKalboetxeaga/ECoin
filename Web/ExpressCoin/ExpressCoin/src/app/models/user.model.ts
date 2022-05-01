import { NFT } from "../interfaces/nft.interface";
import { Crypto } from "../interfaces/Crypto.interface";

export class UserMaker {
    email: string | null;
    pass : string | null;
    username : string | null;
    name : string | null;
    role : string | null;
    nft : NFT[] | null;
    cryptos : Crypto[] | null;

    constructor(_email : string, _pass : string | null, _user : string | null, _name : string | null, _role : string | null, _nft : NFT[] | null , _cryptos : Crypto[] | null)
    {
        this.email = _email;
        this.pass = _pass;
        this.username = _user;
        this.name = _name;
        this.role = _role;
        this.nft = _nft;
        this.cryptos = _cryptos;

    }

}