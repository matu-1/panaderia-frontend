import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button, Tooltip } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import { ROUTE_PAGE } from "constants/index";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    display: "flex",
    flexWrap: 'wrap',
    alignItems: "center",
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1),
  },
  button: {
    marginRight: theme.spacing(1),
  }
}));

const Toolbar = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const history = useHistory();
  
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <Tooltip title="Lista de unidad medida" aria-label="add type">
          <Button 
            className={classes.button}
            onClick={() => history.push(ROUTE_PAGE.INSUMO.LISTAR)} 
            variant="contained"
            color="primary"
            startIcon={<InfoIcon/>}
            >
            unidad medida
          </Button>
        </Tooltip>
        <Button
          color="primary"
          variant="contained"
          onClick={() => history.push(ROUTE_PAGE.INSUMO.CREAR)}
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
