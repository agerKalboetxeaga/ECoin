import { NFT } from "./nft.interface";
import { CryptoSymbol } from "./Crypto.interface";

//  Interface class
export interface User {
    email: string;
    pass : string | null;
    user : string | null;
    name : string | null;
    role : string | null;
    nft : NFT[] | null;
    cryptos : CryptoSymbol[] | null;

}
