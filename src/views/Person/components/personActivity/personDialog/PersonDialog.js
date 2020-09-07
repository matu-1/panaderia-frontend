import React, { useEffect, useContext } from 'react'
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, MenuItem } from '@material-ui/core'
import { schema as schemaValidate} from './schema';
import formSchema from './formSchema';
import { FormInput } from 'components/Form/FormInput';
import useForm from 'hooks/useForm';
import { CANCELAR, SAVE, ROUTE_PARAM, API } from 'constants/index';
import { RequestServer } from 'service/RequestServer';
import MessageContext from 'context/messageContext';

const PersonDialog = ({id, refreshData, openDialog, handleClose}) => {
  const [formState, handleChange, hasError, reset] = useForm(schemaValidate);
  const { open, data} = openDialog;
  const { showSnack } = useContext(MessageContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const rsp = await RequestServer.PUT(
        ROUTE_PARAM(API.DETALLE_ACTIVIDAD.EDIT, { id: data.id }),
        formState.values
      );
      showSnack(rsp.data.message, "success");
      refreshData();
      handleClose();
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  useEffect(() => {
    if(data){
      const { asistio, descripcion } = data;
      const values = {
        isValid: true,
        values: { asistio, descripcion},
        touched: {},
        errors: {},
      };
      reset(values);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const closeDialog = () => {
    handleClose();
  };
  
  return (
    <Dialog fullWidth disableBackdropClick open={open} onClose={closeDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Actualizar datos</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
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
              { formSchema[key].select &&     
                formSchema[key].options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))
              }
              
            </FormInput>
          ))} 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {CANCELAR}
          </Button>
          <Button
            color="primary"
            disabled={!formState.isValid}
            size="large"
            type="submit"
          >
            {SAVE}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default PersonDialog
