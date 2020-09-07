import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, TextField, Typography, ListItemAvatar, Avatar, Divider, Box, CircularProgress } from '@material-ui/core';
import { CLOSE, HOST } from 'constants/index';
import PropTypes from 'prop-types';

const Picker = ({data, handleClose, open, selectItem, render, keysParam, searchIn, divider, titulo = 'Titulo', label = 'Titulo'}) => {
  const [filtro, setFiltro] = useState(data);
  const [typingTimeout, SetTyping] = useState(0);

  const handleChange = (event) => {
    const busqueda = event.target.value;
    clearTimeout(typingTimeout);
    SetTyping(
      setTimeout(() => {
        search(busqueda);
      }, 500)
    );
  };

  const search = (search) => {
    const query = search.trim().toUpperCase();
    const filtro = data.filter(data => `${getDataByKeys(data)}`.includes(query));
    setFiltro(filtro);
  }

  const getDataByKeys = (data) => {
    return searchIn.map(key => data[key]).join('').toUpperCase();
  }

  const closeDialog = () => {
    handleClose();
    setTimeout(() => {
      setFiltro(data);
    }, 1000);
  }

  useEffect(() => {
    setFiltro(data);
  }, [data]);

  const formatearTexto = (item, tipo) => {
    if(keysParam[tipo]?.label && keysParam[tipo]?.keys)
       return `${keysParam[tipo].label}: ${keysParam[tipo].keys.map(key => item[key]).join(' ')}`;
    return keysParam[tipo]?.keys.map(key => item[key]).join(' ');
  }

  const getUrlImage = (foto) => {
    return `${HOST.substring(0, HOST.length - 4)}/${foto}`;
  }

  const RenderItem = ({onClick, item}) => {
    if(render){
      return render(item);
    }
    return ( 
     <>
        <ListItem button onClick={onClick}>
          {keysParam.avatar && 
           <ListItemAvatar>
              <Avatar src={getUrlImage(item[keysParam.avatar])} />
            </ListItemAvatar>
          }
          <ListItemText 
            primary={formatearTexto(item, 'titulo')} 
            secondary={formatearTexto(item, 'subtitulo')} 
          />
        </ListItem>
        { divider && <Divider variant="fullWidth" component="li"/>}
     </>
    );
  }

  return (
    <Dialog
      open={open}
      disableBackdropClick
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">{titulo}</DialogTitle>
      <DialogContent>
      { data == null?
       <Box mt={2} display="flex" justifyContent="center"><CircularProgress /></Box>: 
        <>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={handleChange}
            label={label}
            type="text"
            fullWidth
          />
          <Typography>
            {filtro?.length > 0 && filtro?.length !== data.length && `Se encontro ${filtro.length} resultados`}
          </Typography>
          <List>
            { filtro?.map((item) => (
              <RenderItem 
                key={item.id} 
                item={item} 
                onClick={() => {selectItem(item); closeDialog()}} 
              />
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
};

Picker.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  keysParam: PropTypes.object,
  selectItem: PropTypes.func,
  render: PropTypes.func,
  searchIn: PropTypes.array.isRequired,
  divider: PropTypes.bool,
  titulo: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default Picker;
