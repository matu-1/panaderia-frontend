import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import {
  Grid,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import {
  ROUTE_PAGE,
  INICIO_SESION,
  NOMBRE_EMPRESA,
  WEB,
  INGRESAR,
  HTTP_CODE,
  RECORDAR_PASSWORD,
} from "constants/index";
import useStyles from "./style";
import { schema as schemaValidate } from "./schema.js";
import formSchema from "./formSchema";
import { FormInput } from "components";
import { AuthService } from "service/AuthService";
import MessageContext from "context/messageContext";

const SignIn = (props) => {
  const { history } = props;
  const { showSnack } = useContext(MessageContext);
  const classes = useStyles();
  const [remember, setRemember] = useState(false);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schemaValidate);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  /* const handleBack = () => {
    history.goBack();
  }; */

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };
  const handleChangeCheckBox = (event) => {
    event.persist();
    setRemember(event.target.checked);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const rsp = await AuthService.doLogin(formState.values);
      if (rsp.status === HTTP_CODE.OKEY) {
        AuthService.handleLoginSuccess(rsp.data, remember);
        history.push(ROUTE_PAGE.HOME);
      }
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}></div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignIn}>
                <Typography className={classes.title} variant="h2">
                  {INICIO_SESION}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {[WEB, NOMBRE_EMPRESA].join(" ")}
                </Typography>

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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={remember}
                      name="remember"
                      onChange={handleChangeCheckBox}
                      color="primary"
                    />
                  }
                  label={RECORDAR_PASSWORD}
                />

                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {INGRESAR}
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignIn);
