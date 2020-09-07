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
  ROUTE_PARAM
} from "constants/index";
// import { actividadesPersonaData } from "./data";
import useConfirmDialog from "hooks/useConfirmDialog";
import MessageContext from "context/messageContext";
import PersonDialog from "./personDialog/PersonDialog";
import { useParams } from "react-router-dom";
import { RequestServer } from "service/RequestServer";

const PersonActivity = ({ history }) => {
  const [actividades, setData] = useState(null);
  const [ConfirmDialog, showDialog, closeDialog] = useConfirmDialog('Eliminar', 'Esta seguro de eliminarlo?');
  const { showSnack } = useContext(MessageContext);
  const [openDialog, setOpenDialog] = useState({open: false, data: null});
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const result = await RequestServer.GET(
        ROUTE_PARAM(API.DETALLE_ACTIVIDAD.EDIT, { id })
      );
      setData(result.data.data);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  const toolBar = [
    {
      icon: EditIcon,
      title: EDIT,
      color: "primary",
      onClick: (ids) => setOpenDialog({open: true, data: getItemById(ids[0])}),
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

  const eliminarActivitad = async (data) => {
    try {
      const result = await RequestServer.DELETE(
        ROUTE_PARAM(API.DETALLE_ACTIVIDAD.EDIT, { id: data })
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

  const getItemById = id => {
    return actividades.find(item => item.id === id);
  }

  const handleClose = () => {
    setOpenDialog({open: false, data: null});
  };

  return (
    <Box m={3}>
      <Toolbar id={id} />
      <Box mt={2}>
        <EnhancedTable
          headTable={headCells}
          rowIdName={"id"}
          dataTable={actividades}
          titleTable={'Lista de actividades'}
          toolBarPresent={isToolbarPresent(toolBar)}
          toolBar={toolBar}
          transformColumn={{
            created_at: getDateTime,
            actividad: (item) => item.titulo + ' - ' + getDateTime(item.fecha_hr),
            asistio: item => item? item: 'No se registro',
            descripcion: item => item? item: 'No se registro',
          }}

          reloadCallback={() => {
            setData(null);
            setTimeout(fetchData, 1000);
          }}
        ></EnhancedTable>
      </Box>
      <ConfirmDialog onConfirm={(data) => eliminarActivitad(data)} />
      <PersonDialog
        openDialog={openDialog} 
        handleClose={handleClose}  
        refreshData={fetchData}
      />
    </Box>
  );
};

export default PersonActivity;
