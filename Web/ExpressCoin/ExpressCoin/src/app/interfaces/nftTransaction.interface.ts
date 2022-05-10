import { NFT } from "./nft.interface";

export interface NftTransactions{
    buyer : string;
    seller : string;
    NFT : NFT;
    price : number;
    date : string;
}