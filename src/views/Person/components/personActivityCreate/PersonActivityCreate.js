import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  IconButton,
} from "@material-ui/core";
import { SAVE, BACK, API } from "constants/index";
import { useStyles } from "../../style";
import ActivityDialog from "./ActivityDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import MessageContext from "context/messageContext.js";
import { useParams } from "react-router-dom";
import { RequestServer } from "service/RequestServer";

const PersonActivityCreate = ({ history }) => {
  const className = useStyles();
  const [open, setOpen] = React.useState(false);
  const [actividades, setActividades] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const {showSnack} = useContext(MessageContext);
  const { id } = useParams();

  const getActividades = async () => {
    try {
      const result = await RequestServer.GET(API.ACTIVIDAD.LISTAR);
      setActividades(result.data.data);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  useEffect(() => {
    getActividades();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const rsp = await RequestServer.POST(
        API.DETALLE_ACTIVIDAD.LISTAR,
        { id, actividades: formatearById(detalles)}
      );
      showSnack(rsp.data.message, "success");
      history.goBack();
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  const deleteDetalleItem = ({id}) => {
    const newDetalle = detalles.filter(item => item.id !== id);
    setDetalles(newDetalle);
  }

  const agregarDetalleItem = (data) => {
    if(detalles.find((item) => item.id === data.id)) 
      return showSnack('Ya existe la actividad!!', 'error');
    setDetalles([...detalles, data]);
  }

  const formatearById = detalles => {
    return detalles.map(item => item.id);
  };

  const getDateTime = (data) => {
    const timeStamp = new Date(data);
    return (
      timeStamp.toLocaleDateString() +
      "  " +
      timeStamp.toLocaleTimeString()
    );
  }

  return (
    <div className={className.root}>
      <Card>
        <CardHeader title="Registro de actividad" />
        <CardContent>
          <form onSubmit={handleSubmit}>
    
            <Box mb={1}>
              <Typography>Actividad</Typography>
              <Button onClick={() => setOpen(true)}>
                Seleccione
              </Button>
            </Box>

            <List className={className.lista}>
              { detalles.map( item => (
               <div key={item.id}>
                  <ListItem>
                    <ListItemText 
                      primary={`Titulo: ${item.titulo}`} 
                      secondary={`Fecha y hora: ${getDateTime(item.fecha_hr)}`} 
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => deleteDetalleItem(item)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider variant="fullWidth" component="li" />
               </div>
              ))}
            </List>

            <Button
              color="primary"
              className={className.button}
              disabled={detalles.length === 0}
              size="large"
              type="submit"
              variant="contained"
            >
              {SAVE}
            </Button>

            <Button
              color="inherit"
              size="large"
              variant="contained"
              onClick={() => history.goBack()}
            >
              {BACK}
            </Button>
          </form>
        </CardContent>
      </Card>
      <ActivityDialog
        open={open}
        handleClose={handleClose}
        data={actividades}
        selectItem={agregarDetalleItem}
      />
    </div>
  );
};

export default PersonActivityCreate;
