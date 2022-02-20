import { useEffect } from "react";
import axios from "axios";
import CreateDbUserModal from "../components/CreateDbUserModal";

function Home({ userAddress, userDetails, setUserDetails }) {
  useEffect(() => {
    const chkDb = async () => {
      const result = await axios.get(`http://localhost:3004/${userAddress}`);
      setUserDetails(result.data);
    };
    chkDb();
  }, []);

  return (
    <div>
      {userDetails ? (
        <h2>{`This is ${userDetails['userName']}'s page and this is the account address ${userAddress}`}</h2>
      ) : (
        <CreateDbUserModal
          userAddress={userAddress}
          setUserDetails={setUserDetails}
        />
      )}
    </div>
  );
}

export default Home;
