import { useState, useEffect } from "react";
import {
  AppBar,
  Drawer,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import axios from "axios";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: "#ececec",
    },
    toolbar: theme.mixins.toolbar,
  };
});


function Layout({ children }) {
  const classes = useStyles();

  return (
       <div className={classes.root}>
        <AppBar position="fixed" className={classes.appbar} elevation={0}>
          <Toolbar>
            <p>
              Today is{" "}
              {new Date().toLocaleDateString("en-GB", { dateStyle: "long" })}
            </p>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
        >
          <div>
            <h4 className={classes.title}> Menu sidebar</h4>
          </div>
        </Drawer>

        {/* main contents */}
        <div className={classes.page}>
          <div className={classes.toolbar}></div>
          {children}
        </div>
      </div>
  );
}

export default Layout
