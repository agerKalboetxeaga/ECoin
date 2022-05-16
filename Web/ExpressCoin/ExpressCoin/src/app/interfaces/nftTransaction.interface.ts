import { NFT } from "./nft.interface";

//  Interface class
export interface NftTransactions{
    buyer : string;
    seller : string;
    nft : NFT;
    price : number;
    date : string;
}