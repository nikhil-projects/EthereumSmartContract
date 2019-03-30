require("cryp-to-js")
const SHA256 = require("crypto-js/sha256");


class Hashvalue{
  
    constructor(data) {
        this.data = data;
    }

    calculateHash(data1)
    {
        return SHA256(JSON.stringify(data1)).toString();
    }
    
    ValidateHash(orgHash, chkHash)
    {
    if (orgHash !== chkHash) 
        {
            return false;
        }
     else
         {
           return true;
        }
    }
    
}

let FemiCoin = new Hashvalue();
let orgNonce ="000000000000"
let Nonce    ="000000000000"
let hashData = "Data 22342ert  twertwertw wertwe wertwe twetw wret wertwe twet wetwe twwwetwertwetew   twetwet we rtwtewtwe t twert w twertwet we twetwetwetw  twertwetrwert w wtertwertwert  4234eertwetrwetwetwetwe nwrtwertwe twertwe wetwewet wetwetwetwertwertw   2";

let orghashValue = orgNonce + hashData;

let chkhashValue = Nonce.toString() + hashData.toString();

//console.log('Hash value of Data1 :' + FemiCoin.calculateHash(hashData));

console.log('Hash value of Org :' + FemiCoin.calculateHash(orghashValue));

console.log('Hash value of Check :' + FemiCoin.calculateHash(chkhashValue));

if (FemiCoin.ValidateHash(FemiCoin.calculateHash(orghashValue),FemiCoin.calculateHash(chkhashValue)))
{
console.log('Congradulation Match Found');
}
else
{
console.log('No Match Found');
}
