const SHA256 = require('./node_modules/crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash()
        this.nonce = 0;
    }
     
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block Mined: " + this.hash);
    }

}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 6;
    }

    createGenesisBlock() {
        return new Block(0, "01/08/2022", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i =1; i < this.chain.length; i++) {
                const currentBlock = this.chain[i];
                const previousBlock = this.chain[i-1];

                if(currentBlock.hash !== currentBlock.calculateHash()) {
                    return false;
                }
                if(currentBlock.previousHash !== previousBlock.hash) {
                    return false;
                }
        }
        return true;
    }
}

let danDoCoin =  new Blockchain();

console.log("Mining block 1...");
danDoCoin.addBlock(new Block(1, "01/08/2022", {amount : 3}));
console.log("Mining block 2...");
danDoCoin.addBlock(new Block(2, "02/02/2022", {amount : 15}));
console.log("Mining block 3...");
danDoCoin.addBlock(new Block(3, "02/11/2022", {amount : 9}));
console.log("Mining block 4...");
danDoCoin.addBlock(new Block(4, "02/26/2022", {amount : 21}));
console.log("Mining block 5...");
danDoCoin.addBlock(new Block(5, "02/28/2022", {amount : 6}));
console.log("Mining block 6...");
danDoCoin.addBlock(new Block(6, "03/03/2022", {amount : 12}));
console.log("Mining block 7...");
danDoCoin.addBlock(new Block(7, "03/09/2022", {amount : 18}));
console.log("Mining block 8...");
danDoCoin.addBlock(new Block(8, "03/17/2022", {amount : 30}));
console.log("Mining block 9...");
danDoCoin.addBlock(new Block(9, "03/21/2022", {amount : 108}));

console.log(JSON.stringify(danDoCoin, null, 6));

console.log('Is Blockchain valid? ' + danDoCoin.isChainValid());
