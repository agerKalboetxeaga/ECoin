import { NFT } from "../interfaces/nft.interface";
import { User } from "../interfaces/user.interface";
import { NFTModel } from "./nft.model";

export class NFTUser{
    user: User;
    nft: NFTModel;

    constructor(_user : User, _nft:NFTModel){
        this.user = _user;
        this.nft = _nft
    }
    
    
}