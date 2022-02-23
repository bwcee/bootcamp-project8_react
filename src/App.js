import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Layout from "./components/Layout";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";


function App() {
  /* all 3 states below are set in LogIn component but placed here cos fig may need to use them in other components */
  const [userAddress, setUserAddress] = useState();
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  /* state below initialised in Home component, again placed here cos will need to use it in other components */
  const [userDetails, setUserDetails] = useState();
  /* contracts placed in useRefs cos won't need to rerun app when they change since app is alr rerun when signer changes which will in turn update these useRefs*/
  const mktListingContract = useRef();
  const nftContract = useRef();

  /* 
  1. useEffect below detects changes in connected user/ network and reloads the page if so
  2. ethers.js has a `provider.on("network")` method to check for change in network (ref b). unfortunately does not seem to have an `provider.on("accountsChanged")` method...
  3. So will just not use ethers.js in function below, but just go w Metamask provided windows.ethereum API (ref c)
  4. "eth_accounts" method below chks if metmask alr connected to an account... if so then reload page, if not no need to reload
  Refs
  a. Listening for MetaMask account and network changes in React.js app:  https://medium.com/@thelasthash/listening-for-metamask-account-and-network-changes-in-react-js-app-8608dfa8d8bf
  b. https://docs.ethers.io/v5/single-page/#/v5/concepts/best-practices/-%23-best-practices--network-changes
  c. https://docs.metamask.io/guide/ethereum-provider.html#events
  */

  useEffect(() => {
    if (window.ethereum) {
      const getAccount = async () => {
        const account = await window.ethereum.request({
          method: "eth_accounts",
        });
        window.ethereum.on("chainChanged", () => {
          if (account.length > 0) {
            window.location.assign("/");
          }
        });

        window.ethereum.on("accountsChanged", () => {
          if (account.length > 0) {
            window.location.assign("/");
          }
        });
      };

      getAccount();
    }
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LogIn
            setUserAddress={setUserAddress}
            setProvider={setProvider}
            setSigner={setSigner}
          />
        </Route>
        <Layout
          userAddress={userAddress}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          mktListingContract={mktListingContract}
          nftContract={nftContract}
        >
          <Route exact path="/main">
            <Home
              userAddress={userAddress}
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              signer={signer}
              mktListingContract={mktListingContract}
              nftContract={nftContract}
            />
          </Route>
          <Route path="/*/*">
            <NotFound />
          </Route>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
