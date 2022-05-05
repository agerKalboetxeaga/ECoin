import { User } from "../interfaces/user.interface";

export class BuyCrypto{
    user !: User;
    resta !: number;

    constructor(_user:User, _resta:number){
        this.user = _user;
        this.resta = _resta;
    }
}