import { fade, lighten, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  empty: {
    height: 300,
    textAlign: "center",
  },
}));

export const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      flex: "1 1 auto",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    //width: "100%",
    flex: "1 1 auto",
    width: "auto",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      flex: "none",
    },
  },
  searchIcon: {
    //padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    //pointerEvents: "none",
    //display: "flex",
    display: "contents",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "inherit",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    //paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
    //width: "100%",
    width: "7ch",
    "&:focus": {
      width: "100%",
      border: "solid 1px #00000026",
      borderRadius: "2ch",
      //paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
      //paddingLeft: `8px`,
    },
    [theme.breakpoints.up("sm")]: {
      "&:focus": {
        width: "20ch",
        //paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
        //paddingLeft: `8px`,
      },
    },
  },
}));
