import { useState, useRef } from "react";
import {
  Box,
  Button,
  InputAdornment,
  makeStyles,
  Modal,
  TextField,
} from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { ethers } from "ethers";
import axios from "axios";

const useStyles = makeStyles((theme) => {
  return {
    title: {
      padding: theme.spacing(2),
    },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 800,
      backgroundColor: "white",
      border: "2px solid #ececec",
      boxShadow: 24,
    },
    nameField: {
      width: 780,
      margin: theme.spacing(1),
    },
    descField: {
      width: 780,
      height: 100,
      margin: theme.spacing(1),
    },
    priceField: {
      width: 300,
      height: 100,
      margin: theme.spacing(1),
    },
  };
});

const AddNftModal = ({
  addNftmodal,
  setAddNftModal,
  mktListingContract,
  nftContract,
}) => {
  const classes = useStyles();
  const [nameInputErr, setNameInputErr] = useState(false);
  const [descriptionInputErr, setDescriptionInputErr] = useState(false);
  const [priceInputErr, setPriceInputErr] = useState(false);
  const [fileInputErr, setFileInputErr] = useState(false);
  const nameInput = useRef();
  const descriptionInput = useRef();
  const priceInput = useRef();
  const fileInput = useRef();

  const pinataKey = process.env.REACT_APP_pinataKey;
  const pinataSecret = process.env.REACT_APP_pinataSecret;

  /* 
  pinFile() refs
  a. https://docs.pinata.cloud/api-pinning/pin-file 
  b. https://github.com/komus-Israel/how-to-pin-files-to-pinata-in-react/blob/main/src/App.js
  */
  const pinFile = async (file, name, description) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    const data = new FormData();
    data.append("file", file);

    const metadata = JSON.stringify({
      name,
      keyvalues: { description },
    });
    data.append("pinataMetadata", metadata);

    try {
      const result = await axios.post(url, data, {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data;boundary=${data._boundary}`,
          pinata_api_key: pinataKey,
          pinata_secret_api_key: pinataSecret,
        },
      });
      console.log("This is result from pinning", result);
      return result.data.IpfsHash;
    } catch (err) {
      alert("something went wrong with upload to IPFS");
      console.log(err);
    }
  };

  /* 
  makeToken() and listToken() refs
  a. Building a Full Stack NFT Marketplace on Ethereum with Polygon (https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb)
  */
  const makeToken = async (tokenUrl) => {
    try {
      let mintToken = nftContract.createToken(tokenUrl);
      let mintTokenDone = await mintToken.wait();
      let event = mintTokenDone.events[0];
      let value = event.args[2];
      return Number(value);
    } catch (err) {
      alert("something went wrong with minting the NFT");
      console.log(err);
    }
  };

  const listToken = async (nftContract, tokenId, price) => {
    try {
      let listingToken = await mktListingContract.createMarketItem(
        nftContract,
        tokenId,
        price
      );
      await listingToken.wait();
    } catch (err) {
      alert("something went wrong with listing the NFT in the marketplc");
      console.log(err);
    }
  };

  const verifyCreateNftInputs = async (evt) => {
    evt.preventDefault();
    const name = nameInput.current.value.toLowerCase();
    const description = descriptionInput.current.value.toLowerCase();
    let price = Number(priceInput.current.value);
    const file = fileInput.current.files[0];

    /* b4 verfifying inputs, set all error states to false */
    setNameInputErr(false);
    setDescriptionInputErr(false);
    setPriceInputErr(false);
    setFileInputErr(false);

    if (name === "" || /[<>=@{};]/.test(name)) {
      setNameInputErr(true);
      alert("nil name or illegal characs used");
      return;
    }

    if (description === "" || /[<>=@{};]/.test(description)) {
      setDescriptionInputErr(true);
      alert("nil description or illegal characs used");
      return;
    }

    if (price === "" || typeof price !== "number" || price <= 0) {
      setPriceInputErr(true);
      alert("nil/ non-number input or negative price inputted");
      return;
    }

    if (!file || file["type"].split("/")[0] !== "image") {
      setFileInputErr(true);
      alert("nil file or non-image file chosen");
      return;
    }

    const ipfsHash = await pinFile(file, name, description);
    console.log("This is ipfsHash", ipfsHash);
    const tokenUrl = `https://api.pinata.cloud/data/pinList?hashContains=${ipfsHash}`;
    console.log("This is tokenUrl", tokenUrl);
    try {
      const result = await axios.get(tokenUrl, {
        headers: {
          pinata_api_key: pinataKey,
          pinata_secret_api_key: pinataSecret,
        },
      });
      console.log("This is result from ipfs", result.data);
    } catch (err) {
      alert("something went wrong with getting bck data frm ipfs");
      console.log(err);
    }

    const tokenId = await makeToken(tokenUrl);
    price = ethers.utils.parseUnits(price, "ether");
    await listToken(nftContract, tokenId, price);
    setAddNftModal(false);
  };

  return (
    <Modal open={addNftmodal} onClose={() => setAddNftModal(false)}>
      <Box className={classes.modal}>
        <h3 className={classes.title}>Make me a NFT!</h3>
        <form noValidate autoComplete="off" onSubmit={verifyCreateNftInputs}>
          <TextField
            required
            className={classes.nameField}
            inputRef={nameInput}
            label="NFT name"
            color="secondary"
            placeholder="key in nft name, <>=@{}; not allowed"
            variant="outlined"
            error={nameInputErr}
          />
          <TextField
            required
            className={classes.descField}
            inputRef={descriptionInput}
            label="NFT description"
            color="secondary"
            placeholder="key in nft description, <>=@{}; not allowed"
            variant="outlined"
            error={descriptionInputErr}
          />
          <TextField
            required
            inputRef={priceInput}
            className={classes.priceField}
            InputProps={{
              endAdornment: <InputAdornment position="end">eth</InputAdornment>,
            }}
            label="NFT price"
            color="secondary"
            placeholder="price must be greater than 0"
            variant="outlined"
            error={priceInputErr}
          />
          <TextField
            required
            inputRef={fileInput}
            className={classes.priceField}
            label="NFT image"
            color="secondary"
            placeholder="please upload image file here"
            variant="outlined"
            type="file"
            error={fileInputErr}
          />
          <br></br>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
          >
            Create the NFT already!
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddNftModal;
