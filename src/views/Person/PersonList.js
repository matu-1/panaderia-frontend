import React, { useState, useEffect, useContext } from "react";
import { UsersToolbar } from "./components";
import { useStyles } from "./style";
import { Box, Avatar, Typography } from "@material-ui/core";
import {
  API,
  TPERSONA,
  DELETE,
  EDIT,
  ROUTE_PAGE,
  ROUTE_PARAM,
} from "constants/index";
import { EnhancedTable } from "components";
import { headCells } from "./components/UsersTable/config.table";
import FilterListIcon from "@material-ui/icons/FilterList";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import InfoIcon from "@material-ui/icons/Info";
import DeleteIcon from "@material-ui/icons/Delete";
import { getInitials } from "helpers";
import { isToolbarPresent } from "components/Table";
import MessageContext from "context/messageContext";
import useConfirmDialog from "hooks/useConfirmDialog";
import { RequestServer } from "service/RequestServer";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

const PersonList = ({ history }) => {
  const classes = useStyles();
  const [users, setData] = useState(null);
  const { showSnack } = useContext(MessageContext);
  const [ConfirmDialog, showDialog, closeDialog] = useConfirmDialog(
    "Eliminar",
    "Esta seguro de eliminarlo?"
  );

  const fetchData = async () => {
    try {
      const result = await RequestServer.GET(API.PERSONA.LISTAR_SIN_ESTADO);
      setData(result.data.data);
    } catch (error) {
      console.log("fetchData", error);
      showSnack(error.message, error.type);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolBar = [
    {
      icon: InfoIcon,
      title: "Ver actividades",
      color: "primary",
      onClick: (ids) =>
        history.push(
          ROUTE_PARAM(ROUTE_PAGE.INVITACION.LISTAR_ACTIVIDAD, { id: ids[0] })
        ),
      disabled: (ids) => false,
      show: (ids) => ids.length === 1,
      privilegio: true,
    },
    {
      icon: AddIcon,
      title: "Registrar en organización",
      color: "primary",
      onClick: (ids) =>
        history.push({
          pathname: ROUTE_PAGE.ORGANIZACION.TREE,
          data: ids[0],
        }),
      disabled: (ids) => (ids.length === 1 ? false : true),
      show: (ids) => ids.length === 1 && !hasState(ids[0]),
    },
    {
      icon: EditIcon,
      title: EDIT,
      color: "primary",
      onClick: (ids) =>
        history.push(ROUTE_PARAM(ROUTE_PAGE.INVITACION.EDITAR, { id: ids[0] })),
      disabled: (ids) => false,
      show: (ids) => ids.length === 1,
      privilegio: true,
    },
    {
      icon: DeleteIcon,
      title: DELETE,
      color: "primary",
      onClick: (ids) => showDialog(ids),
      disabled: (ids) => false,
      show: (ids) => ids.length > 0,
      privilegio: true,
    },
    {
      icon: FormatListBulletedIcon,
      title: "Ver todos",
      // color: "primary",
      onClick: (ids) => history.push(ROUTE_PAGE.INVITACION.LISTAR_ALL),
      disabled: (ids) => false,
      show: (ids) => true,
      privilegio: true,
    },
    {
      icon: FilterListIcon,
      title: "filtrar",
      color: "primary",
      onClick: (ids) => console.log("editar", ids),
      disabled: (ids) => ids.length === 0,
      show: (ids) => ids.length > 0,
      privilegio: true,
    },
  ];

  const eliminarPersona = async (data) => {
    console.log("[PersonaList] data", data);
    try {
      const result = await RequestServer.DELETE(
        ROUTE_PARAM(API.PERSONA.EDIT, { id: data })
      );
      showSnack(result.data.message, "success");
      fetchData();
    } catch (error) {
      showSnack(error.message, error.type);
    }
    closeDialog();
  };

  const hasState = (id) => {
    const persona = users.find((item) => item.id === id);
    return persona?.estado !== "no registrado";
  };

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <Box mt={2}>
        <EnhancedTable
          headTable={headCells}
          rowIdName={"id"}
          dataTable={users}
          titleTable={TPERSONA}
          toolBarPresent={isToolbarPresent(toolBar)}
          toolBar={toolBar}
          transformColumn={{
            sucursal: (item) => item.nombre,
            estado: (item) => (item ? item.estado ?? item : "no registrado"),
            created_at: (item) => {
              const timeStamp = new Date(item);
              return (
                timeStamp.toLocaleDateString() +
                "  " +
                timeStamp.toLocaleTimeString()
              );
            },
          }}
          customColumn={{
            nombre: (row) => (
              <div className={classes.nameContainer}>
                <Avatar className={classes.avatar} src={row.avatarUrl}>
                  {getInitials(row.nombre)}
                </Avatar>
                <Typography variant="body1">{row.nombre}</Typography>
              </div>
            ),
            estado: ({ estado }) => (
              <div className={classes.nameContainer}>
                {estado === "no registrado" ? (
                  <Typography
                    color="error"
                    variant="button"
                    className={`${classes.estado} ${classes.error}`}
                  >
                    {estado}
                  </Typography>
                ) : (
                  <Typography
                    color="primary"
                    variant="button"
                    className={`${classes.estado} ${classes.default}`}
                  >
                    {estado}
                  </Typography>
                )}
              </div>
            ),
          }}
          reloadCallback={() => {
            setData(null);
            setTimeout(fetchData, 1000);
          }}
        ></EnhancedTable>
      </Box>
      <ConfirmDialog onConfirm={(data) => eliminarPersona(data)} />
    </div>
  );
};

export default PersonList;
