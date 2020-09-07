import React, { useContext, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
} from "@material-ui/core";
import { SAVE, BACK, API, ROUTE_PARAM } from "constants/index";
import { schema as schemaValidate } from "./schema";
import formSchema from "./formSchema";
import { FormInput } from "components";
import { useStyles } from "../../../style";
import useForm from "hooks/useForm";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import { useParams } from "react-router-dom";

const initialValues = {
  isValid: false,
  values: {},
  touched: {},
  errors: {},
};

const EstadoEdit = ({ history }) => {
  const className = useStyles();
  const [formState, handleChange, hasError, reset] = useForm(schemaValidate);
  const { showSnack } = useContext(MessageContext);
  const { id } = useParams();

  const fetchDataEdit = async () => {
    try {
      const result = await RequestServer.GET(
        ROUTE_PARAM(API.ESTADO.EDIT, { id })
      );
      Object.keys(formSchema).forEach(
        (key) => (initialValues.values[key] = result.data.data[key])
      );
      reset(initialValues);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const rsp = await RequestServer.PUT(
        ROUTE_PARAM(API.ESTADO.EDIT, { id }),
        formState.values
      );
      showSnack(rsp.data.message, "success");
      history.goBack();
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  useEffect(() => {
    formState.touched.descripcion = true;
    fetchDataEdit();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={className.root}>
      <Card>
        <CardHeader title="Edicion de estado" />
        <CardContent>
          <form onSubmit={handleSubmit}>
          {Object.keys(formSchema).map((key) => (
            <FormInput
              key={key}
              name={key}
              select={formSchema[key].select}
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
              shrink={formSchema[key].shrink}
            >
              {formSchema[key].select &&
                formSchema[key].options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </FormInput>
          ))}

            <Button
              color="primary"
              className={className.button}
              disabled={!formState.isValid}
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
    </div>
  );
};

export default EstadoEdit;
