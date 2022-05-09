import { NFTModel } from "./nft.model";

export class NftCreator {
    username : string;
    NFT : NFTModel[];

    constructor(_username : string, _NFTs : NFTModel[]){
        this.username = _username;
        this.NFT = _NFTs;
    }
}