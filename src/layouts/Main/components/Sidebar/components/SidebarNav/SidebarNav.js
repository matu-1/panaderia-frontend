/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { List, ListItem, colors } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
  nested: {
    paddingLeft: theme.spacing(3),
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const SidebarNav = (props) => {
  const { pages, className, ...rest } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(pages.map((e) => false));

  const handleClick = (e) => {
    open[e] = !open[e];
    setOpen({ ...open });
  };

  return (
    <List {...rest} className={clsx(classes.root, className)} key={"menu"}>
      {pages.map((page, index) => (
        <div key={index}>
          <ListItem
            button
            onClick={() => handleClick(index)}
            key={page.title + index}
            //component={CustomRouterLink}
            //to={page.href}
          >
            <ListItemIcon key={index.toString() + "ss"}>
              {page.icon}
            </ListItemIcon>
            <ListItemText key={index.toString() + "s2"} primary={page.title} />
            {page.children == null ? null : open[index] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItem>
          {page.children == null ? null : (
            <Collapse
              in={open[index]}
              timeout="auto"
              unmountOnExit
              key={index.toString() + "s3"}
            >
              <List
                component="div"
                disablePadding
                key={"submenu" + index.toString()}
              >
                {page.children.map((child, index) => (
                  <ListItem
                    button
                    className={classes.nested}
                    key={child.title + "c"}
                    component={CustomRouterLink}
                    to={child.href}
                  >
                    <ListItemIcon key={index.toString() + "s3"}>
                      {child.icon}
                    </ListItemIcon>
                    <ListItemText
                      key={index.toString() + "s4"}
                      primary={child.title}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </div>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

export default SidebarNav;
