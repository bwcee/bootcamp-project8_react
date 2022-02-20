import { useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import EditDbUserModal from "./EditDbUserModal";

const DrawerList = ({ userAddress, userDetails, setUserDetails }) => {
  const [modal, setModal] = useState(false);
  /* 
  1. doLogOut changes url to http://localhost:3000 and forces a refresh of the page
  2. this shld => userAddress, provider & signer states get reset to initial values
  */
  const doLogOut = () => {
    window.location.assign("/");
  };
  return (
    <List>
      <ListItem button onClick={() => setModal(true)}>
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
        modal={modal}
        setModal={setModal}
        userAddress={userAddress}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
    </List>
  );
};

export default DrawerList;
