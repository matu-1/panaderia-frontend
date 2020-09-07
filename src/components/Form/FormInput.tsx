import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(2),
  },
}));
const FormInput = (props) => {
  const classNameDefault = useStyles();
  const {
    label,
    helperText,
    name,
    onChange,
    value,
    type,
    className,
    error,
    shrink = null,
    select = false,
  } = props;

  return (
    <TextField
      className={[className, classNameDefault.textField].join(" ")}
      error={error}
      fullWidth
      select={select}
      helperText={helperText}
      label={label}
      name={name}
      onChange={onChange}
      type={type}
      value={type === 'file'? undefined: value || ""}
      variant="outlined"
      InputLabelProps={shrink && { shrink:true }}
    >
      {props.children}
    </TextField>
  );
};
export { FormInput };
