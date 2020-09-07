import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    padding: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  lista: {
    marginBottom: theme.spacing(2)
  },
  estado: {
    borderRadius: 10,
    padding: '0 10px',
    fontSize: 12
  },
  error: {
    background: '#FEF0EF'
  },
  default: {
    backgroundColor: '#e3f2fd'
  }
}));
export { useStyles };
