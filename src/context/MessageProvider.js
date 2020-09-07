import React, { useState } from "react";
import MessageContext from "./messageContext";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MessageProvider = ({ children }) => {
  const [openSnack, setOpenSnack] = useState({
    open: false,
    message: null,
    type: null,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnack({ open: false, message: null });
  };

  const showSnack = (message = "Soy un mensaje ;)", type = "success") => {
    setOpenSnack({ open: true, message, type });
  };

  return (
    <MessageContext.Provider
      value={{
        showSnack,
        handleClose,
      }}
    >
      {children}
      {!openSnack.open ? null : (
        <Snackbar
          key={"message"}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openSnack.open}
          autoHideDuration={6000}
          onClose={handleClose}
          //message={openSnack.message}
          /*action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }*/
        >
          <Alert onClose={handleClose} severity={openSnack.type}>
            {openSnack.message}
          </Alert>
        </Snackbar>
      )}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
