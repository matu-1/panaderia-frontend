import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@material-ui/core";
import { CANCELAR, CONFIRMAR } from "constants/index";

const useConfirmDialog = (titulo = 'Titulo', mensaje = 'Soy un mensaje', open = false, data = null) => {
  const [confirmDialog, setConfirmDialog] = useState({open, data});

  const closeDialog = () => {
    setConfirmDialog({...confirmDialog, open: false,});
  };

  const showDialog = (data = null) => {
    setConfirmDialog({open: true, data});
  }

  const ConfirmDialog = ({onConfirm}) => {
    return (
      <Dialog fullWidth open={confirmDialog.open}>
        <DialogTitle>{titulo}</DialogTitle>
        <DialogContent>
          <Typography>{mensaje}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            {CANCELAR}
          </Button>
          <Button onClick={() => onConfirm(confirmDialog.data)} color="primary" autoFocus>
            {CONFIRMAR}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return [ConfirmDialog, showDialog, closeDialog];
};

export default useConfirmDialog;
