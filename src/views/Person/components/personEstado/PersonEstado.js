import React, { useState, useEffect, useContext } from "react";
import { Box } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { EnhancedTable } from "components";
import { isToolbarPresent } from "components/Table";
import { Toolbar, headCells } from "./tabla";
import {
  API,
  DELETE,
  EDIT,
  ROUTE_PARAM,
  ROUTE_PAGE,
  ESTADO
} from "constants/index";
import useConfirmDialog from "hooks/useConfirmDialog";
import MessageContext from "context/messageContext";
import { useParams } from "react-router-dom";
import { RequestServer } from "service/RequestServer";

const PersonEstado = ({ history }) => {
  const [actividades, setData] = useState(null);
  const [ConfirmDialog, showDialog, closeDialog] = useConfirmDialog('Eliminar', 'Esta seguro de eliminarlo?');
  const { showSnack } = useContext(MessageContext);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const result = await RequestServer.GET(
        ROUTE_PARAM(API.ESTADO.LISTAR_PERSONA, { id })
      );
      setData(result.data.data);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
 
  const toolBar = [
    {
      icon: EditIcon,
      title: EDIT,
      color: "primary",
      onClick: (ids) =>
        history.push(
          ROUTE_PARAM(ROUTE_PAGE.INVITACION.EDITAR_ESTADO, { id: ids[0] })
        ),
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
      show: (ids) => ids.length >  0,
      privilegio: true,
    },
    {
      icon: FilterListIcon,
      title: "filtrar",
      color: "primary",
      onClick: (ids) => console.log("editar", ids),
      disabled: (ids) => false ,
      show: (ids) => ids.length > 0,
      privilegio: true,
    },
  ];

  const eliminarEstado = async (data) => {
    try {
      const result = await RequestServer.DELETE(
        ROUTE_PARAM(API.ESTADO.EDIT, { id: data })
      );
      showSnack(result.data.message, "success");
      fetchData();
    } catch (error) {
      showSnack(error.message, error.type);
    }
    closeDialog();
  }

  const getDateTime = (data) => {
    const timeStamp = new Date(data);
    return (
      timeStamp.toLocaleDateString() +
      "  " +
      timeStamp.toLocaleTimeString()
    );
  }

  return (
    <Box m={3}>
      <Toolbar id={id} />
      <Box mt={2}>
        <EnhancedTable
          headTable={headCells}
          rowIdName={"id"}
          dataTable={actividades}
          titleTable={'Lista de estados'}
          toolBarPresent={isToolbarPresent(toolBar)}
          toolBar={toolBar}
          transformColumn={{
            estado: item => ESTADO[item],
            descripcion: item => item? item: 'No se registro',
            created_at: getDateTime,
          }}

          reloadCallback={() => {
            setData(null);
            setTimeout(fetchData, 1000);
          }}
        ></EnhancedTable>
      </Box>
      <ConfirmDialog onConfirm={(data) => eliminarEstado(data)} />
    </Box>
  );
};

export default PersonEstado;
