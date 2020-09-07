import React, { useContext, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
} from "@material-ui/core";
import { SAVE, BACK, API } from "constants/index";
import { schema as schemaValidate } from "./schema";
import formSchema from "./formSchema";
import { FormInput } from "components";
import { useStyles } from "../../../style";
import useForm from "hooks/useForm";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import { useParams } from "react-router-dom";

const EstadoCreate = ({ history }) => {
  const className = useStyles();
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const { showSnack } = useContext(MessageContext);
  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    formState.values.persona_id = id;
    try {
      const rsp = await RequestServer.POST(
        API.ESTADO.LISTAR,
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
  }, [])

  return (
    <div className={className.root}>
      <Card>
        <CardHeader title="Registro de estado" />
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

export default EstadoCreate;
