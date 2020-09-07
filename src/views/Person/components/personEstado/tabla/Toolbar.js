import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { BACK, ROUTE_PARAM, ROUTE_PAGE } from "constants/index";
import { useHistory } from "react-router-dom";

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

const Toolbar = (props) => {
  const { className, id, ...rest } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => history.goBack()}
        >
          {BACK}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() =>  history.push(ROUTE_PARAM(ROUTE_PAGE.INVITACION.CREAR_ESTADO, { id }))}
          startIcon={<AddIcon />}
        >
          agregar
        </Button>
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
