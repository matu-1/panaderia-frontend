import { useState, useEffect } from "react";
import validate from "validate.js";

validate.validators.fileType = function(value, options, key, attributes) {
  const { message, type } = options;
  if(!value || new RegExp(type).test(value?.type)){
    return null
  }
  return message;
};

validate.validators.fileSize = function(value, options, key, attributes) {
  const { message, size } = options;
  if(!value || value?.size <= size * 1000){
    return null
  }
  return message;
};

const initialValues = {
  isValid: false,
  values: {},
  touched: {},
  errors: {},
};

const useForm = (schemaValidate) => {
  const [formState, setFormState] = useState(initialValues);

  useEffect(() => {
    const errors = validate(formState.values, schemaValidate);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values, schemaValidate]);

  const handleChange = (event) => {
    event.persist();

    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.type === "file"
            ? event.target.files[0]
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    });
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const reset = (newState = initialValues) => {
    setFormState(newState);
  };

  return [formState, handleChange, hasError, reset];
};

export default useForm;
