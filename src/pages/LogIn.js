import { Avatar, Box, Button, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";

function LogIn({ setUserAddress, setProvider, setSigner }) {
  const history = useHistory();

  /* 
1. In connect() below, can simply use window.ethereum to get hold of metamask accounts, however since using ethers.js thot might as well try to use it 
Refs:
a. Build a React Component For MetaMask Auth: https://betterprogramming.pub/build-a-react-component-for-metamask-auth-10b7ecba5c3f
b. Building a DApp with Ethers.js: https://blog.logrocket.com/building-dapp-ethers-js/
*/
  const connect = async () => {
    if (!window.ethereum) {
      return alert("Time to get MetaMask good person!");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any") 
    setProvider(provider);
    const signer = provider.getSigner() 
    setSigner(signer);

    /* "eth_requestAccounts" is what prompts MetaMask pop-up to ask user to accept or reject request */
    await provider.send("eth_requestAccounts", []);
    let account = await signer.getAddress();
    setUserAddress(account);
    history.push("/main");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {
            connect();
          }}
        >
          Sign in with MetaMask
        </Button>
      </Box>
    </Container>
  );
}

export default LogIn;
