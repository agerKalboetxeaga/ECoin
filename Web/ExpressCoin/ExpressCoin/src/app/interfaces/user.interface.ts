import { NFT } from "./nft.interface";
import { Cryptoo } from "./cryptocurrency.interface";

export interface User {
    email: string;
    pass : string | null;
    user : string | null;
    name : string | null;
    role : string | null;
    nft : NFT[] | null;
    cryptos : Crypto[] | null;

}