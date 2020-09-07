import React, { useState } from "react";
import {
  CardHeader,
  Card,
  Avatar,
  IconButton,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { getUrlImage } from "utils";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },

  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));
const PerfilPersona = (props) => {
  const { person, selectCallBack } = props;
  const [filtro, SetFiltro] = useState([]);
  const [typingTimeout, SetTyping] = useState(0);
  const classes = useStyles();
  const handleChange = (event) => {
    var busqueda = event.target.value;
    clearTimeout(typingTimeout);
    SetTyping(
      setTimeout(() => {
        searchPerson(busqueda);
      }, 500)
    );
  };
  const searchPerson = (patron) => {
    let filtro = [];
    if (patron.trim() === "") {
      SetFiltro(filtro);
      return;
    }
    person.forEach((p) => {
      if (
        (p.nombre + " " + p.apellido)
          .toUpperCase()
          .includes(patron.toUpperCase()) ||
        p.codigo.includes(patron)
      ) {
        filtro.push(p);
      }
    });
    SetFiltro(filtro);
  };
  return (
    <div>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        onChange={handleChange}
        label="Contacto"
        type="text"
        fullWidth
      />
      {filtro.length > 0 ? <p>Se encontro {filtro.length} resultados</p> : null}
      {(filtro.length > 0 ? filtro : person).map((p, index) => (
        <Card className={classes.root} key={index + "asd"}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                src={getUrlImage(p.foto)}
                className={classes.large}
              >
                R
              </Avatar>
            }
            action={
              <IconButton
                aria-label="settings"
                onClick={() => selectCallBack(p)}
              >
                <DoneOutlineIcon />
              </IconButton>
            }
            title={p.nombre}
            subheader={p.codigo}
          />
        </Card>
      ))}
    </div>
  );
};
export default PerfilPersona;
