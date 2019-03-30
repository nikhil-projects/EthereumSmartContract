require("cryp-to-js")
const SHA256 = require("crypto-js/sha256");
class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

calculateHash() {
  return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
}

   

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("BLOCK MINED: " + this.hash);
    }
}

class Blockchain{
constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;

        // Place to store transactions in between block creation
        this.pendingTransactions = [];

        // How many coins a miner will get as a reward for his/her efforts
        this.miningReward = 100;
    }



    createGenesisBlock() {
        return new Block(0, "01/03/2018", "Genesis block", "0");
    }

createTransaction(transaction) {
    // There should be some validation here!

    // Push into onto the "pendingTransactions" array
    this.pendingTransactions.push(transaction);
}

minePendingTransactions(miningRewardAddress) {
    // Create new block with all pending transactions and mine it..
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    // Add the newly mined block to the chain
    this.chain.push(block);

    // Reset the pending transactions and send the mining reward
    this.pendingTransactions = [
        new Transaction(null, miningRewardAddress, this.miningReward)
    ];
}

getBalanceOfAddress(address){
    let balance = 0; // you start at zero!

    // Loop over each block and each transaction inside the block
    for(const block of this.chain){
        for(const trans of block.transactions){

            // If the given address is the sender -> reduce the balance
            if(trans.fromAddress === address){
                balance -= trans.amount;
            }

            // If the given address is the receiver -> increase the balance
            if(trans.toAddress === address){
                balance += trans.amount;
            }
        }
    }

    return balance;
}

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

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

console.log('Mining block 1');



console.log('Creating some transactions...');
FemiCoin.createTransaction(new Transaction('address1', 'address2', 100));
FemiCoin.createTransaction(new Transaction('address2', 'address1', 50));


//FemiCoin.addBlock(new Block(1, "04/03/2018", { amount: 400 }));
//console.log('Mining block 2');
//FemiCoin.addBlock(new Block(2, "04/03/2018", { amount: 800 }));

// Check if chain is valid (will return true)
console.log('Blockchain valid? ' + FemiCoin.isChainValid());

// Let's now manipulate the data
//FemiCoin.chain[1].data = { amount: 100 };

// Check our chain again (will now return false)
//console.log("Blockchain valid? " + FemiCoin.isChainValid());

// Re- Run this miner part to check the balance. 

console.log('Starting the miner...');

FemiCoin.minePendingTransactions('Femi-address');
console.log('Balance of Femi address is', FemiCoin.getBalanceOfAddress('Femi-address'));
