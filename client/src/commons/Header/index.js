import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NavLink
            to={"/"}
            style={{ color: "white" }}
            className={classes.title}
          >
            <Typography variant="h6">Home</Typography>
          </NavLink>

          <NavLink to={"/login"} style={{ color: "white" }}>
            <Button color={"inherit"}>Login</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};
