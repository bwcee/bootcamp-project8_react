# Technical Notes

## Set-up for react app to run

### Connecting to smart contracts

1. follow instructions in solidity repo scripts/deploy.js to create local blockchain using hardhat and deploy contracts to local blockchain
   - basically open one terminal and enter `npx hardhat node` to get a blockchain running locally
   - open 2nd terminal and enter `npx hardhat run --network localhost scripts/deploy.js` to get the contracts deployed on local blockchain
2. an artifacts folder will be created in solidity repo. copy MarketListing.json and NFT.json from the folder.
3. paste MarketListing.json and NFT.json into this repo's src/contracts folder (this has already been done... but this step needs to be redone if MarketListing or NFT contracts change)
4. update addresses in "src/contracts/addressSetting.js" (actually it looks like the contract addresses may be the same everytime they are re-deployed... not sure if they address will change if the contract contents change between deployments... dunno, guess just gotta monitor e addresses everytime we deploy)
5. the local blockchain comes w 20 accounts tt start w 10000 eth each. See [Building a Full Stack NFT Marketplace on Ethereum with Polygon](https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb) on how to link MetaMask to these accounts
6. the 20 accounts are the same for everyone using hardhat's local blockchain! (https://hardhat.org/hardhat-network/#running-stand-alone-in-order-to-support-wallets-and-other-software)

### Connecting to postgresql backend

1. ensure postgresql service running in a terminal
2. start express server tt serves postgresql db from the bckend repo w `nodemon index.js`

### Start up this react app

1. finally after the above all done, start up this app with `npm run start`
