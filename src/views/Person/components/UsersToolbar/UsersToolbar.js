import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { ROUTE_PAGE } from "constants/index";
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

const UsersToolbar = (props) => {
  const { className, ...rest } = props;
  const history = useHistory();
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        {/* <Button className={classes.button}>Import</Button>
        <Button className={classes.button}>Export</Button> */}
        <Button
          color="primary"
          variant="contained"
          onClick={() => history.push(ROUTE_PAGE.INVITACION.CREAR)}
          startIcon={<AddIcon />}
        >
          agregar
        </Button>
      </div>
      {/* <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
        />
      </div> */}
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string,
};

export default UsersToolbar;
