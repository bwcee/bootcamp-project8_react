import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import CreateDbUserModal from "../components/CreateDbUserModal";
/* for somme reason if try to place e 2 files below outside of src, get cannot find module error... see ""../contracts/WhyABIsHere.md" */
import MarketListing from "../contracts/MarketListing.json";
import NFT from "../contracts/NFT.json";
import { mktAdd, nftAdd } from "../contracts/addressSetting.js";

function Home({
  userAddress,
  userDetails,
  setUserDetails,
  signer,
  mktListingContract,
  nftContract,
}) {
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
  mktListingContract.current = new ethers.Contract(
    mktAdd,
    MarketListing.abi,
    signer
  );
  nftContract.current = new ethers.Contract(nftAdd, NFT.abi);

  const loadNFTs = async () => {
    const nftsData = await mktListingContract.current.getAllMarketItems();
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
