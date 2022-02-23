import { useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import EditDbUserModal from "./EditDbUserModal";
import AddNftModal from "./AddNftModal";

const DrawerList = ({
  userAddress,
  userDetails,
  setUserDetails,
  mktListingContract,
  nftContract,
}) => {
  const [editDbUsermodal, setEditDbUserModal] = useState(false);
  const [addNftmodal, setAddNftModal] = useState(false);
  /* 
  1. doLogOut changes url to http://localhost:3000 and forces a refresh of the page
  2. this shld => userAddress, provider & signer states get reset to initial values
  */
  const doLogOut = () => {
    window.location.assign("/");
  };
  return (
    <List>
      <ListItem button onClick={() => setAddNftModal(true)}>
        <ListItemIcon>
          <AddAPhotoIcon />
          <ListItemText primary="Make a NFT!" />
        </ListItemIcon>
      </ListItem>
      <ListItem button onClick={() => setEditDbUserModal(true)}>
        <ListItemIcon>
          <EditOutlinedIcon />
          <ListItemText primary="Update user name" />
        </ListItemIcon>
      </ListItem>
      <ListItem button onClick={doLogOut}>
        <ListItemIcon>
          <LockOpenIcon />
          <ListItemText primary="Log me out!" />
        </ListItemIcon>
      </ListItem>
      <EditDbUserModal
        editDbUsermodal={editDbUsermodal}
        setEditDbUserModal={setEditDbUserModal}
        userAddress={userAddress}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
      <AddNftModal
        addNftmodal={addNftmodal}
        setAddNftModal={setAddNftModal}
        mktListingContract={mktListingContract}
        nftContract={nftContract}
      />
    </List>
  );
};

export default DrawerList;
