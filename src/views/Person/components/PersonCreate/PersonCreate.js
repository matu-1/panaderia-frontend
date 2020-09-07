import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Typography,
  FormControlLabel,
  Card,
  CardContent,
  CardHeader,
  Box,
  IconButton,
  Tooltip,
  Fade,
  FormGroup,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import {
  SAVE,
  BACK,
  BUSCAR,
  CLOSE,
  BUSCAR_CONTACTO,
  API,
} from "constants/index";
import { schema as schemaValidate } from "./schema.js";
import formSchema from "./formSchema";
import { FormInput } from "components";
import { useStyles } from "../../style";
import PerfilPersona from "../Perfil/Perfil.js";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import Picker from "components/Form/Picker.js";

const PersonCreate = (props) => {
  const { history } = props;
  const className = useStyles();
  const [open, setOpen] = React.useState(false);
  const [contacto, setContacto] = React.useState(null);
  const [dataPerson, setDataPerson] = useState([]);
  const [sucursal, setSucursal] = useState(null);
  const [sucursales, setSucursales] = useState([]);
  const [openSucursal, setOpenSucursal] = useState(false);
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const {showSnack} = useContext(MessageContext);

  const getPersonasActivas = async () => {
    try {
      const result = await RequestServer.GET(API.PERSONA.LISTAR_ACTIVO);
      console.log('result person ac' ,result.data);
      setDataPerson(result.data.data);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  const getSucursales = async () => {
    try {
      const result = await RequestServer.GET(API.SUCURSAL.LISTAR);
      console.log(result.data);
      setSucursales(result.data.data);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  useEffect(() => {
    getPersonasActivas();
    getSucursales();
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleCloseSucursal = () => {
    setOpenSucursal(false);
  };

  const selectPerson = (selectContact) => {
    handleClose();
    setContacto(selectContact);
  };

  const selectSucursal = (data) => {
    handleClose();
    setSucursal(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    formState.values.sucursal_id = sucursal.id;
    formState.values.parent_id = contacto.id;   
    try {
      const rsp = await RequestServer.POST(
        API.PERSONA.LISTAR,
        formState.values
      );
      showSnack(rsp.data.message, "success");
      history.goBack();
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  const renderSearchPerson = () => (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{BUSCAR_CONTACTO}</DialogTitle>
      <DialogContent>
        <PerfilPersona person={dataPerson} selectCallBack={selectPerson} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {CLOSE}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div className={className.root}>
      {renderSearchPerson()}
      <Card>
        <CardHeader
          title="Registro de invitado"
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormGroup row>
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Tooltip
                    title={BUSCAR}
                    arrow
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    placement="right"
                  >
                    <IconButton aria-label="search" onClick={handleClickOpen}>
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                }
                label={
                  contacto == null ? (
                    ""
                  ) : (
                    <Chip
                      key={"value"}
                      label={
                        contacto.nombre +
                        " " +
                        contacto.apellido +
                        " - " +
                        contacto.codigo
                      }
                    />
                  )
                }
              />
            </FormGroup>

            {Object.keys(formSchema).map((key) => (
              <FormInput
                key={key}
                name={key}
                label={formSchema[key].label}
                value={formState.values[key]}
                helperText={
                  hasError(key)
                    ? formState.errors[key][0]
                    : formSchema[key].helperText
                }
                error={hasError(key)}
                onChange={handleChange}
                type={formSchema[key].type}
              />
            ))}

            <Box mb={2} >
              <Typography>Sucursal</Typography>
              <Button onClick={() => setOpenSucursal(true)}>
                {sucursal ? sucursal.nombre : "Seleccione"}
              </Button>
            </Box>

            <Button
              color="primary"
              className={className.button}
              disabled={!formState.isValid || !sucursal || !contacto}
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
              onClick={() => history.goBack() }
            >
              {BACK}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Picker 
        open={openSucursal}
        handleClose={handleCloseSucursal}
        data={sucursales}
        titulo="Seleccione la sucursal"
        label="Sucursal"
        searchIn={['nombre', 'direccion']}
        keysParam={{
          titulo: {keys: ['nombre']}, 
          subtitulo: {keys: ['direccion']}, 
        }}
        selectItem={selectSucursal}
      />
    </div>
  );
};

PersonCreate.propTypes = {
  history: PropTypes.object,
};

export default PersonCreate;
