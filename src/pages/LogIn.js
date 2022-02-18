import { Avatar, Box, Button, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";

  /* 
In connect() below, can simply use window.ethereum to get hold of metamask accounts, however since using ethers.js thot might as well try to use it 
- Build a React Component For MetaMask Auth: https://betterprogramming.pub/build-a-react-component-for-metamask-auth-10b7ecba5c3f
- Building a DApp with Ethers.js: https://blog.logrocket.com/building-dapp-ethers-js/
*/
const connect = async (setUserAddress, history) => {
  if (!window.ethereum) {
    return alert("Time to get MetaMask good person!");
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();

  await provider.send("eth_requestAccounts", []);
  let account = await signer.getAddress();
  setUserAddress(account);
  history.push("/main");
};

/* This chkInitialConx was from Build a React Component For MetaMask Auth above... but din really see a use for it for now... */
// const chkInitialConx = async (setUserAddress) => {
//   if (window.ethereum) {
//     setUser(setUserAddress);
//   }
// };

function LogIn({ setUserAddress }) {
  const history = useHistory();

  /* Similarly this useEffect was from Build a React Component For MetaMask Auth above... but dun need for now... */
  // useEffect(() => {
  //   chkInitialConx(setUserAddress);
  // }, []);

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
          fullwidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {
            connect(setUserAddress, history);
          }}
        >
          Sign in with MetaMask
        </Button>
      </Box>
    </Container>
  );
}

export default LogIn;
