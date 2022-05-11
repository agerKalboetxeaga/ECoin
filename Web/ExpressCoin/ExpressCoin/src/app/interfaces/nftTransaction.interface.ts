import { NFT } from "./nft.interface";

export interface NftTransactions{
    buyer : string;
    seller : string;
    nft : NFT;
    price : number;
    date : string;
}