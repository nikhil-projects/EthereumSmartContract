// Action Item : 
// Change different difficulty level and check the mining response. 


require("cryp-to-js")
const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            
              console.log("Nonce Attempt :" + this.nonce);
            this.hash = this.calculateHash();
        }
        console.log("Date Time :" + Date());
        console.log("Nonce : " + this.nonce)
        console.log("BLOCK MINED: " + this.hash);
    }
}

class Blockchain{
  constructor() {
    this.chain = [this.createGenesisBlock()];
    // Change difficulty level
    this.difficulty = 1;
}

    createGenesisBlock() {
        return new Block(0, "01/03/2018", "Genesis Root block", "0");
    }

addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
}
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

/*
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        console.log(newBlock.previousHash)
        newBlock.hash = newBlock.calculateHash();
        console.log(newBlock.hash)
        this.chain.push(newBlock);
    }

*/

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

}

let FemiCoin = new Blockchain();
console.log('Blockchain course');
console.log('Mining block 1');


FemiCoin.addBlock(new Block(1, "04/03/2018", { amount: 400 }));
console.log('Mining block 2');
FemiCoin.addBlock(new Block(2, "04/03/2018", { amount: 800 }));

// Check if chain is valid (will return true)
console.log('Blockchain valid? ' + FemiCoin.isChainValid());

// Let's now manipulate the data
FemiCoin.chain[1].data = { amount: 100 };

// Check our chain again (will now return false)
console.log("Blockchain valid? " + FemiCoin.isChainValid());
