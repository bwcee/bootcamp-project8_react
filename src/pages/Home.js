import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import CreateDbUserModal from "../components/CreateDbUserModal";
/* for somme reason if try to place e 2 files below outside of src, get cannot find module error... */
import MarketListing from "../MarketListing.json";
import NFT from "../NFT.json";
/* 
1. when using local blockchain network provided by hardhat, need to get the addresses below after contracts deployed locally... addresses will change w every deployment
2. this is just here now for ease of testing... prob shift out to some config file at a later stage 
*/
const mktAdd = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const nftAdd = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function Home({ userAddress, userDetails, setUserDetails, signer }) {
  const [allNfts, setAllNfts] = useState([]);
  useEffect(() => {
    const chkDb = async () => {
      const result = await axios.get(`http://localhost:3004/${userAddress}`);
      setUserDetails(result.data);
    };
    chkDb();
  }, []);

  /* 
  Ref
  a. Building a Full Stack NFT Marketplace on Ethereum with Polygon (https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb)
  */
  useEffect(() => {
    loadNFTs();
  }, []);
  /* 
  1. think last param in Contract can be either provider or signer... passing in signer => signer can manipulate contract methods while if pass in provider, then contract only has read-only-access
  Ref
  a. Connecting to a Contract (https://docs.ethers.io/v5/api/contract/example/#example-erc-20-contract--connecting-to-a-contract)
  */
  const mktListingContract = new ethers.Contract(
    mktAdd,
    MarketListing.abi,
    signer
  );
  const nftContract = new ethers.Contract(nftAdd, NFT.abi, signer);

  const loadNFTs = async () => {
    const nftsData = await mktListingContract.getAllMarketItems();
    /* nft.tokenUri() is function inherited from ERC721URIStorage, basically returns the Uri for a tokenId */
    const nftArr = await Promise.all(
      nftsData.map(async (nft) => {
        // const tokenUri = await nft.tokenUri(nft.tokenId);
        // const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(nft.price.toString(), "ether");
        let singleNFT = {
          price,
          tokenId: nft.tokenId.toNumber(),
          seller: nft.seller,
          owner: nft.owner,
          // image: meta.data.image,
          // name: meta.data.name,
          // description: meta.data.description,
        };
        return singleNFT;
      })
    );
    setAllNfts(nftArr);
  };

  return (
    <div>
      {userDetails ? (
        <h2>{`This is ${userDetails["userName"]}'s page and this is the account address ${userAddress}`}</h2>
      ) : (
        <CreateDbUserModal
          userAddress={userAddress}
          setUserDetails={setUserDetails}
        />
      )}
      {allNfts.length > 0 ? (
        <p>Time to start mapping nfts to display them!</p>
      ) : (
        <p>Nil nfts minted yet, time to start minting!</p>
      )}
    </div>
  );
}

export default Home;
