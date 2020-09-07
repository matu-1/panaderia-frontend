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
import { useParams } from "react-router-dom";
import {
  SAVE,
  BACK,
  API,
  ROUTE_PARAM,
} from "constants/index";
import { FormInput } from "components";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import Picker from "components/Form/Picker.js";
import formSchema from "./formSchema";
import { schema as schemaValidate } from "./schema.js";
import { useStyles } from "../../style/style";
import { unidadesData } from "./data";

const initialValues = {
  isValid: false,
  values: {},
  touched: {},
  errors: {},
};

const InsumoEdit = (props) => {
  const { history } = props;
  const className = useStyles();
  const [unidad, setUnidad] = useState(null);
  const [unidades, setUnidades] = useState(unidadesData);
  const [openUnidad, setOpenUnidad] = useState(false);
  const [formState, handleChange, hasError, reset] = useForm(schemaValidate);
  const {showSnack} = useContext(MessageContext);
  const { id } = useParams();

  const getUnidadMedida = async () => {
    try {
      const result = await RequestServer.GET(API.INSUMO.LISTAR);
      console.log(result.data);
      setUnidades(result.data.data);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  const fetchDataEdit = async () => {
    try {
      const result = await RequestServer.GET(
        ROUTE_PARAM(API.INSUMO.EDIT, { id })
      );
      Object.keys(formSchema).forEach(
        (key) => (initialValues.values[key] = result.data.data[key] + '')
      );
      setUnidad(result.data.data.unidad)
      reset(initialValues);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  useEffect(() => {
    getUnidadMedida();
    fetchDataEdit();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const handleCloseUnidad = () => {
    setOpenUnidad(false);
  };

  const selectUnidad = (data) => {
    handleCloseUnidad();
    setUnidad(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    formState.values.unidad_id = unidad.id;
    try {
      const rsp = await RequestServer.POST(
        API.INSUMO.LISTAR,
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
          title="Edicion de insumo"
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
              <Typography>Unidad medida</Typography>
              <Button onClick={() => setOpenUnidad(true)}>
                {unidad ? unidad.nombre : "Seleccione"}
              </Button>
            </Box>

            <Button
              color="primary"
              className={className.button}
              disabled={!formState.isValid || !unidad}
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
        open={openUnidad}
        handleClose={handleCloseUnidad}
        data={unidades}
        titulo="Seleccione la unidad de medida"
        label="Nombre"
        searchIn={['nombre']}
        keysParam={{
          titulo: {keys: ['nombre']}, 
        }}
        selectItem={selectUnidad}
      />
    </div>
  );
};

InsumoEdit.propTypes = {
  history: PropTypes.object,
};

export default InsumoEdit;
