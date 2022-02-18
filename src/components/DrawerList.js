import { useState, useRef } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Modal,
  TextField,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import axios from "axios";
import { Link, useLocation, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    title: {
      padding: theme.spacing(2),
    },
    linkText: {
      textDecoration: "none",
    },
    active: {
      background: "#f4f4f4",
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

const DrawerList = ({ locs }) => {
  const classes = useStyles();
  const location = useLocation();
  const [locInputErr, setLocInputErr] = useState(false);
  const [modal, setModal] = useState(false);
  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);
  const locInput = useRef();
  const history = useHistory();

  const doSubmit = (evt) => {
    setLocInputErr(false);
    const input = locInput.current.value.toLowerCase();
    if (input === "" || locs.some((loc) => loc.name === input)) {
      evt.preventDefault();
      alert("dude either u ain't enter no nuthing or u entering e same thang");
      setLocInputErr(true);
    } else {
      axios
        .post("http://localhost:3004/trips", { name: input })
        .then((result) => {
          console.log("This is result frm posting new location", result);
          setModal(false);
          history.push("/");
        });
    }
  };
  return (
    <div>
      <List>
        <Link to="/" className={classes.linkText}>
          <ListItem
            button
            className={location.pathname === "/" ? classes.active : null}
          >
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        {locs.length > 0
          ? locs.map((loc) => {
              return (
                <Link
                  key={loc.id}
                  to={`/loc/${loc.id}/${loc.name}`}
                  className={classes.linkText}
                >
                  <ListItem
                    button
                    className={
                      location.pathname.split("/")[3] === loc.name
                        ? classes.active
                        : null
                    }
                  >
                    <ListItemText primary={loc.name.toUpperCase()} />
                  </ListItem>
                </Link>
              );
            })
          : ""}
        <ListItem button onClick={handleOpen}>
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Add a location" />
        </ListItem>
      </List>

      <Modal open={modal} onClose={handleClose}>
        <Box className={classes.modal}>
          <h3 className={classes.title}>NEW LOCATION</h3>
          <form noValidate autoComplete="off" onSubmit={doSubmit}>
            <TextField
              required
              inputRef={locInput}
              color="secondary"
              placeholder="Location"
              variant="standard"
              className={classes.title}
              error={locInputErr}
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
    </div>
  );
};

export default DrawerList;
