import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, TextField, Typography, IconButton, ListItemSecondaryAction, CircularProgress, Box } from '@material-ui/core';
import { CLOSE } from 'constants/index';
import AddIcon from '@material-ui/icons/Add';

const ActivityDialog = ({data, handleClose, open, selectItem}) => {
  const [filtro, setFiltro] = useState(data);
  const [typingTimeout, SetTyping] = useState(0);

  const handleChange = ({target}) => {
    const busqueda = target.value;
    clearTimeout(typingTimeout);
    SetTyping(
      setTimeout(() => {
        search(busqueda);
      }, 500)
    );
  }

  const search = (search) => {
    const query = search.trim().toUpperCase();
    const filtro = data.filter(({titulo}) => titulo.toUpperCase().includes(query));
    setFiltro(filtro);
  }

  const closeDialog = () => {
    handleClose();
    setFiltro(data);
  }

  useEffect(() => {
    setFiltro(data);
  }, [data])

  const getDateTime = (data) => {
    const timeStamp = new Date(data);
    return (
      timeStamp.toLocaleDateString() +
      "  " +
      timeStamp.toLocaleTimeString()
    );
  }

  console.log('data', data)

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Seleccione las actividades</DialogTitle>
      <DialogContent>
      { data == null?
      <Box mt={2} display="flex" justifyContent="center"><CircularProgress /></Box>:
      <>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          onChange={handleChange}
          label="Actividad"
          type="text"
          fullWidth
        />
        <Typography>
          {filtro?.length > 0 && filtro?.length !== data.length && `Se encontro ${filtro.length} resultados`}
        </Typography>
        <List>
          { filtro?.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.titulo} secondary={getDateTime(item.fecha_hr)} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => selectItem(item)}>
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          { data?.length === 0 && 
            <Typography style={{marginTop: 16}} variant="h5" align="center">No hay registros, por favor realice uno</Typography> 
          }
        </List>
        </>  
    }
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          {CLOSE}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ActivityDialog;
