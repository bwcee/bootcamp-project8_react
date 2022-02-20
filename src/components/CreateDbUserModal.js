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

const CreateDbUserModal = ({userAddress, setUserDetails}) => {
  const classes = useStyles();
  const [userNameInputErr, setUserNameInputErr] = useState(false);
  const [modal, setModal] = useState(true);
  // const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);
  const userNameInput = useRef();

  const doSubmit = (evt) => {
    evt.preventDefault();
    setUserNameInputErr(false);
    const input = userNameInput.current.value.toLowerCase();
    if (input === "" ) {
      alert("dude u ain't enter no nuthing");
      setUserNameInputErr(true);
    } else {
      axios
        .post("http://localhost:3004", { userName: input, userAdd: userAddress })
        .then((result) => {
          /* setUserDetails below so created db record can be used in Home component */
          setUserDetails(result.data)
          setModal(false);
        });
    }
  };
  return (
      <Modal open={modal} onClose={handleClose}>
        <Box className={classes.modal}>
          <h3 className={classes.title}>Provide user name</h3>
          <form noValidate autoComplete="off" onSubmit={doSubmit}>
            <TextField
              required
              inputRef={userNameInput}
              color="secondary"
              placeholder="any user name you like"
              variant="outlined"
              className={classes.title}
              error={userNameInputErr}
            />
            <br></br>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
  
  );
};

export default CreateDbUserModal;
