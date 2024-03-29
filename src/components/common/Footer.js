import { makeStyles } from "@material-ui/core";
import { FACTORY_ADDRESS } from "constants/index";
import React from "react";
import { urls } from "utils/formatters";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  item: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 13,
    color: theme.palette.primary.iconColor,
    [theme.breakpoints.down("sm")]: {
      fontSize: 9,
      marginLeft: 5,
      marginRight: 5,
    },
  },
  ankrLabel: {
    textAlign: "center",
    color: theme.palette.primary.iconColor,
    fontSize: 12,
    paddingTop: 3,
    marginLeft: 10,
    // marginBottom: 4,
  },
  icon: {
    width: 25,
    height: "100%",
    marginRight: 10,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <a
        className={classes.item}
        // href={urls.showAddress(FACTORY_ADDRESS[1])}
        href="https://www.logisticinfotech.com/"

        target="_blank"
        rel="noreferrer"
      >
        Contract
      </a>
      <a
        className={classes.item}
        href="https://www.logisticinfotech.com/"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>
      <a
        className={classes.item}
        href="https://www.logisticinfotech.com/"
        target="_blank"
        rel="noreferrer"
      >
        Twitter
      </a>
      <a
        className={classes.item}
        href="https://www.logisticinfotech.com/"
        target="_blank"
        rel="noreferrer"
      >
        Telegram
      </a>
      <a
        className={classes.item}
        href="https://www.logisticinfotech.com/"
        target="_blank"
        rel="noreferrer"
      >
        Discord
      </a>
      <div className={classes.ankrLabel}>
        <img
          src="https://media.licdn.com/dms/image/C510BAQHCMvCV9clZcA/company-logo_200_200/0/1529662792491?e=2147483647&v=beta&t=itkKW9BOsC9eW4gfaPGBx_AiTesoGDPu8kv906r9NkY"
          alt="Ankr"
          className={classes.icon}
        />
        Logistic infotech
      </div>
    </div>
  );
};

export default React.memo(Footer);
