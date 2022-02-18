
function Home (userAddress){
  console.log("This is userAddress", userAddress)
  return (<div>
      <h2>{`This is Home page and this is the account address ${userAddress.userAddress}`}</h2>
    </div>)
}

export default Home