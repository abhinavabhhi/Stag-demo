import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "white",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  button: {
    boxShadow: "none", // Remove box-shadow
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title} component={Link} to="/">
          Sephora oneTag
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          className={`${classes.link} ${classes.button}`}
        >
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
