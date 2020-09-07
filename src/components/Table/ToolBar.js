import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ReplayIcon from "@material-ui/icons/Replay";
import { useToolbarStyles } from "./style";
import { RECARGAR, SELECCIONADO } from "constants/index";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import InputBase from "@material-ui/core/InputBase";

const EnhancedTableToolbar = (props) => {
  const {
    actionToolbar,
    rowIds,
    numSelected,
    reloadCallback,
    title,
    onAfterTyping,
    toolBarShow,
  } = props;
  const classes = useToolbarStyles();
  const renderItemAction = (action, key, tipo = "desktop") => {
    const showPresent = typeof action.show === "function";
    const disabledPresent = typeof action.disabled === "function";
    const onClickPresent = typeof action.onClick === "function";
    const privilegioPresent =
      action.privilegio !== null && action.privilegio !== undefined;

    if (privilegioPresent) {
      if (!action.privilegio) return null;
    }
    if (showPresent) {
      if (!action.show(rowIds)) return null;
    }

    if (tipo === "movil") {
      return (
        <MenuItem
          key={key + "meu"}
          onClick={onClickPresent ? () => action.onClick(rowIds) : null}
          disabled={disabledPresent ? action.disabled(rowIds) : false}
        >
          <IconButton aria-label="filter list" color={action.color}>
            <action.icon />
          </IconButton>
          <p>{action.title}</p>
        </MenuItem>
      );
    }
    return (
      <Tooltip title={action.title} key={key}>
        <span>
          <IconButton
            aria-label="filter list"
            color={action.color}
            onClick={onClickPresent ? () => action.onClick(rowIds) : null}
            disabled={disabledPresent ? action.disabled(rowIds) : false}
          >
            <action.icon />
          </IconButton>
        </span>
      </Tooltip>
    );
  };

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {actionToolbar.map((action, key) =>
        renderItemAction(action, key, "movil")
      )}
    </Menu>
  );
  const showMenuMovil = () => {
    if (!toolBarShow) return false;
    let isShow = false;
    actionToolbar.forEach((action) => {
      let resultCheck;
      let showPresent = typeof action.show === "function";
      if (showPresent) {
        resultCheck = action.show(rowIds);
      } else {
        resultCheck = true;
      }
      if (resultCheck) {
        isShow = true;
      }
    });
    return toolBarShow && isShow;
  };
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>

      <>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1" component="div">
            {numSelected} {SELECCIONADO}
          </Typography>
        ) : null}

        <div className={classes.search}>
          {/* <div className={classes.searchIcon}>
            <IconButton onClick={() => console.log("llamando")}>
              <SearchIcon />
            </IconButton>
          </div> */}
          <InputBase
            placeholder="Buscar..."
            onChange={(event) => onAfterTyping(event.target.value)}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <div className={classes.sectionDesktop}>
          {!toolBarShow
            ? null
            : actionToolbar.map((a, key) => renderItemAction(a, key))}
        </div>
        {reloadCallback == null ? null : (
          <Tooltip title={RECARGAR}>
            <IconButton aria-label="filter list" onClick={reloadCallback}>
              <ReplayIcon />
            </IconButton>
          </Tooltip>
        )}
        <div className={classes.sectionMobile}>
          {!showMenuMovil() ? null : (
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          )}
        </div>
      </>
      {toolBarShow ? renderMobileMenu : null}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
export { EnhancedTableToolbar };
