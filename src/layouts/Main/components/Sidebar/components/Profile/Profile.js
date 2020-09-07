import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
import { RequestServer } from "service/RequestServer";
import { API } from "constants/index";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    avatar: "",
    bio: "",
  });

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    RequestServer.GET(API.INFOPERSONAL).then((rsp) => {
      if (isMounted) {
        setUser({
          name: rsp.data.data.nombre,
          avatar: rsp.data.data.foto,
          bio: rsp.data.data.nivel,
        });
      }
    });
    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        //component={RouterLink}
        src={user.avatar}
        //to="/settings"
      />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
