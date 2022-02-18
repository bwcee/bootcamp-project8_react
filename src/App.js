import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

function App() {
  const [userAddress, setUserAddress] = useState();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LogIn userAddress={userAddress} setUserAddress={setUserAddress}/>
        </Route>
        <Layout>
          <Route exact path="/main">
            <Home userAddress={userAddress}/>
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
