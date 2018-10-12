const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock() {
        return new Block(0, '01-01-2018', 'Genesis block', "0")
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        // new block must point to the previous block
        newBlock.previousHash = this.getLatestBlock()
        newBlock.hash = newBlock.calculateHash()
        // in reality, this requires lot more work to add a new block
        this.chain.push(newBlock)
    }
}

let manjuCoin = new Blockchain();
manjuCoin.addBlock(new Block(1, '01-02-2018', { cash: 10 }))
manjuCoin.addBlock(new Block(1, '01-03-2018', { cash: 12 }))

console.log('Manju Coin ', JSON.stringify(manjuCoin, null, 4))