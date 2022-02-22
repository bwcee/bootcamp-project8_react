# Technical Notes

## Set-up for react app to run

### Connecting to smart contracts

1. follow instructions in solidity repo scripts/deploy.js to create local blockchain using hardhat and deploy contracts to local blockchain
2. an artifacts folder will be created in solidity repo. copy MarketListing.json and NFT.json from the folder.
3. paste MarketListing.json and NFT.json into this repo's src folder (this has already been done... but this step needs to be redone if MarketListing or NFT contracts change)
4. the local blockchain comes w 20 accounts tt start w 10000 eth each. See [Building a Full Stack NFT Marketplace on Ethereum with Polygon](https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb) on how to link MetaMask to these accounts
5. becos this is a local blockchain created by hardhat, think all accounts and addresses will be diff everytime the local blockchain is spun up...

### Connecting to postgresql backend

1. ensure postgresql service running in a terminal
2. start express server tt serves postgresql db from the bckend repo w `nodemon index.js`

### Start up this react app

1. finally after the above all done, start up this app with `npm run start`
