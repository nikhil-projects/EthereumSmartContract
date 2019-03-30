require("cryp-to-js")
const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(idx, timestamp, txndata, prvHash = '') {
        this.idx = idx;
        this.prvHash = prvHash;
        this.timestamp = timestamp;
        this.txndata = txndata;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.idx + this.prvHash + this.timestamp + JSON.stringify(this.txndata)).toString();
    }

    displayHash(hashval)
    {
    //console.log ('Hash Value :' + calculateHash()) ;
    console.log ('Hash Value :' + hashval) ;
    }
    
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/03/2018", "Genesis Root Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.prvHash = this.getLatestBlock().hash;
        newBlock.displayHash(newBlock.prvHash)
        newBlock.hash = newBlock.calculateHash();
        newBlock.displayHash(newBlock.hash)
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.prvHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}



let FemiCoin = new Blockchain();
FemiCoin.addBlock(new Block(1, "04/03/2018", { amount: 20000 }));
FemiCoin.addBlock(new Block(2, "04/03/2018", { amount: 80000 }));

// Check if chain is valid (will return true)
console.log('Blockchain valid? ' + FemiCoin.isChainValid());

console.log('Manipulate Data .....');

// Let's now manipulate the data
FemiCoin.chain[1].txndata = { amount: 100 };

// Check our chain again (will now return false)
console.log("Blockchain valid? " + FemiCoin.isChainValid());
