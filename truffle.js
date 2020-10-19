const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require('fs')

// First read in the secrets.json to get our mnemonic
let secrets
let mnemonic
let privateKeys

if (fs.existsSync('secrets.json')) {
  secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'))
  mnemonic = secrets.mnemonic
  token = secrets.token
  privateKeys = secrets.privKeys
} else {
  console.log('No secrets.json found. If you are trying to publish EPM ' +
              'this will fail. Otherwise, you can ignore this message!')
  mnemonic = ''
  token = ''
  privateKeys = []
}

module.exports = {
  networks: {
    live: {
      provider: function() {
        return new HDWalletProviderPriv({ privateKeys, provider: 'https://mainnet.infura.io/' + token })
      },
      network_id: 1, // Ethereum public network
      from: '0x6239ff1040e412491557a7a02b2cbcc5ae85dc8f',
      // Needed to set the gasPrice and Nonce in the console for this to work
      // var contract = Kudos.new({gasPrice:5000000000, nonce: 64})
      gasPrice: 5000000000,
      // nonce: 64
      // gas: 5612388,
      // gas: 4612388
      // optional config values
      // host - defaults to "localhost"
      // port - defaults to 8545
      // gas
      // gasPrice
      // from - default address to use for any transaction Truffle makes during migrations
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider({ mnemonic: { phrase: mnemonic }, providerOrUrl: 'https://ropsten.infura.io/' + token })
      },
      network_id: 3,
      from: '0xd386793f1db5f21609571c0164841e5ea2d33ad8',
      // gas: 5612388
      // gas: 4612388
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider({ privateKeys, providerOrUrl: 'https://rinkeby.infura.io/' + token })
      },
      network_id: 4,
      from: '0x6239ff1040e412491557a7a02b2cbcc5ae85dc8f',
    },
    xdai: {
      provider: function() {
        return new HDWalletProvider({ privateKeys, providerOrUrl: 'https://dai.poa.network' })
      },
      network_id: 100,
      from: '0x6239ff1040e412491557a7a02b2cbcc5ae85dc8f',
    },
    development: {
      host: "localhost",
      port: 8545,
      network_id: 'default'
    }
  },
  compilers: {
    solc: {
      version: "0.4.24"
    }
  }
}
