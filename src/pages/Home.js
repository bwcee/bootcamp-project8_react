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
  /* states to store all tokens retrieved from marketplc + token data frm pinata */
  const [allNfts, setAllNfts] = useState([]);
  /* need a .env file in root folder with info below */
  const pinataKey = process.env.REACT_APP_pinataKey;
  const pinataSecret = process.env.REACT_APP_pinataSecret;
  const pinataGatewayBase = process.env.REACT_APP_pinataGatewayBase;

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
  },[]);
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
  nftContract.current = new ethers.Contract(nftAdd, NFT.abi, signer);

  const loadNFTs = async () => {
    try {
      const nftsData = await mktListingContract.current.getAllMarketItems();
      console.log("This is nftsData", nftsData);
      /* nftContract.tokenURI() is function inherited from ERC721URIStorage, basically returns the Uri for a tokenId */
      const nftArr = await Promise.all(
        nftsData.map(async (nft) => {
          const tokenUri = await nftContract.current.tokenURI(nft.tokenId);
          console.log(
            "tokenUri",
            tokenUri,
            "for this tokenId",
            Number(nft.tokenId)
          );
          const tokenPinataData = await axios.get(tokenUri, {
            headers: {
              pinata_api_key: pinataKey,
              pinata_secret_api_key: pinataSecret,
            },
          });
          
          let price = ethers.utils.formatUnits(nft.price.toString(), "ether");
          let singleNFT = {
            price,
            tokenId: Number(nft.tokenId),
            seller: nft.seller,
            owner: nft.owner,
            image: `${pinataGatewayBase}${tokenPinataData.data.rows[0].ipfs_pin_hash}`, //this is pinata url to retrieve image
            name: tokenPinataData.data.rows[0].metadata.name,
            description: tokenPinataData.data.rows[0].metadata.keyvalues.description,
          };
          return singleNFT;
        })
      );
      setAllNfts(nftArr);
      
    } catch (err) {
      console.log("Something went wrong with retrieving nfts", err);
    }
  };

  console.log("This is allNfts", allNfts);

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
