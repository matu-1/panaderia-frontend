import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Box,
} from "@material-ui/core";
import {
  SAVE,
  BACK,
  BUSCAR_CONTACTO,
  API,
  ROUTE_PARAM,
} from "constants/index";
import { schema as schemaValidate } from "./schema.js";
import formSchema from "./formSchema";
import { FormInput } from "components";
import { useStyles } from "../../style";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import Picker from "components/Form/Picker.js";
import { useParams } from "react-router-dom";

const initialValues = {
  isValid: false,
  values: {},
  touched: {},
  errors: {},
};

const PersonEdit = (props) => {
  const { history } = props;
  const className = useStyles();
  const [open, setOpen] = React.useState(false);
  const [contacto, setContacto] = React.useState(null);
  const [dataPerson, setDataPerson] = useState([]);
  const [sucursal, setSucursal] = useState(null);
  const [sucursales, setSucursales] = useState([]);
  const [openSucursal, setOpenSucursal] = useState(false);
  const [formState, handleChange, hasError, reset] = useForm(schemaValidate);
  const {showSnack} = useContext(MessageContext);
  const { id } = useParams();

  const getPersonasActivas = async () => {
    try {
      const result = await RequestServer.GET(API.PERSONA.LISTAR_ACTIVO);
      console.log(result.data);
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

  const fetchDataEdit = async () => {
    try {
      const result = await RequestServer.GET(
        ROUTE_PARAM(API.PERSONA.EDIT, { id })
      );
      Object.keys(formSchema).forEach(
        (key) => (initialValues.values[key] = result.data.data[key] + '')
      );
      setContacto(result.data.data.padre);
      setSucursal(result.data.data.sucursal)
      reset(initialValues);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  useEffect(() => {
    fetchDataEdit();
    getPersonasActivas();
    getSucursales();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      console.log(formState.values, id)
      const rsp = await RequestServer.PUT(
        ROUTE_PARAM(API.PERSONA.EDIT, { id }),
        formState.values
      );
      showSnack(rsp.data.message, "success");
      history.goBack();
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  return (
    <div className={className.root}>
      <Card>
        <CardHeader
          title="Edicion de invitado"
        />
        <CardContent>
          <form onSubmit={handleSubmit}>

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
              <Typography>Contacto</Typography>
              <Button onClick={() => handleClickOpen()}>
                {contacto ? `${contacto.nombre} ${contacto.apellido}` : "Seleccione"}
              </Button>
            </Box>


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
      <Picker 
        open={open}
        handleClose={handleClose}
        data={dataPerson}
        titulo={BUSCAR_CONTACTO}
        label="Contacto"
        searchIn={['nombre', 'apellido']}
        keysParam={{
          titulo: {keys: ['nombre', 'apellido']}, 
          subtitulo: {keys: ['codigo']}, 
          avatar: 'foto'
        }}
        selectItem={selectPerson}
      />
    </div>
  );
};

PersonEdit.propTypes = {
  history: PropTypes.object,
};

export default PersonEdit;
