import { useState, useRef } from "react";
import {
  Box,
  Button,
  makeStyles,
  Modal,
  TextField,
} from "@material-ui/core";
// import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
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
      width: 500,
      backgroundColor: "white",
      border: "2px solid #ececec",
      boxShadow: 24,
    },
  };
});

const EditDbUserModal = ({modal, setModal, userAddress, userDetails, setUserDetails}) => {
  const classes = useStyles();
  const [changeInputErr, setChangeInputErr] = useState(false);
  const changeInput = useRef();

  const doEdit = (evt) => {
    evt.preventDefault();
    setChangeInputErr(false);
    const input = changeInput.current.value.toLowerCase();
    if (input === "" ) {
      alert("dude u ain't enter no nuthing");
      setChangeInputErr(true);
    } else {
      axios
        .put("http://localhost:3004", { userName: input, userAdd: userAddress })
        .then((result) => {
          /* setUserDetails below so created db record can be used in Home component */
          setUserDetails(result.data)
          setModal(false);
        });
    }
  };
  return (
      <Modal open={modal} onClose={()=>setModal(false)}>
        <Box className={classes.modal}>
          <h3 className={classes.title}>Change user name</h3>
          <form noValidate autoComplete="off" onSubmit={doEdit}>
            <TextField
              required
              inputRef={changeInput}
              color="secondary"
              placeholder="key in watever name you like to change to"
              variant="outlined"
              className={classes.title}
              error={changeInputErr}
            />
            <br></br>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}
            >
              Change name
            </Button>
          </form>
        </Box>
      </Modal>
  
  );
};

export default EditDbUserModal;
