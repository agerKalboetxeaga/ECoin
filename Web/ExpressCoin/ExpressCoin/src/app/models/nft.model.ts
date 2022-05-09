export class NFTModel {

    id !: string | null;
    name !: string;
    creator !: string;
    price !: number;
    symbol !: string;
    img !: string;

    constructor(_id : string| null, _name : string, _creator : string, _price : number, _symbol : string, _img : string){

        this.id = _id;
        this.name = _name;
        this.creator = _creator;
        this.price = _price;
        this.symbol = _symbol;
        this.img = _img;

    }

}