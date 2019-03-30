
require("cryp-to-js")
const SHA256 = require("crypto-js/sha256");


class Hashvalue{
  
    constructor(data) {
        this.data = data;
    }

    displayHash(data1)
    {
        return SHA256(JSON.stringify(data1)).toString();
    }
}

let FemiCoin = new Hashvalue();
//let Nonce = "0000000000001"
let hashData = "Blockchain and Bitcoin course";

//let hashValue = Nonce.toString() + hashData.toString();

console.log('Hash value of Data1 :' + FemiCoin.displayHash(hashData));
//console.log('Hash value of Data1 :' + FemiCoin.displayHash(hashValue));