import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
// rgba(0, 143, 251, 0.85); cases #008ffb
// fill: rgba(0, 227, 150, 0.85); recover #00e396
// rgba(254, 176, 25, 0.85) dead #feb019
const useStyles = makeStyles({
  infoBox: {
    flex: 1,
    cursor: "pointer",
  },
  infoBoxSelected: {
    borderTop: "10px solid #34eb5e",
  },
  infoBoxRed: {
    borderColor: "#6F2232",
  },
  infoBoxCases: {
    color: "#6F2232",
    fontWeight: 600,
    fontSize: 28,
    marginTop: 5,
  },
  infoBoxCasesGreen: {
    color: "#5CDB95",
  },
  infoBoxTitleRed: {
    color: "#6F2232",
    fontWeight: "bold",
  },
  infoBoxTitleGreen: {
    color: "#5CDB95",
    fontWeight: "bold",
  },
  infoBoxTotal: {
    color: "#05386B",
    fontWeight: 700,
    fontSize: 16,
    marginTop: 5,
  },
});

function InfoBox({ isRed, active, title, cases, total, ...props }) {
  const classes = useStyles();

  return (
    <Card
      onClick={props.onClick}
      className={`${classes.infoBox} ${active && classes.infoBoxSelected} ${
        isRed && classes.infoBoxRed
      }`}
    >
      <CardContent>
        <Typography
          className={
            isRed ? classes.infoBoxTitleRed : classes.infoBoxTitleGreen
          }
          align="center"
          variant="h5"
        >
          {title}
        </Typography>
        <Typography
          className={`${classes.infoBoxCases} ${
            !isRed && classes.infoBoxCasesGreen
          }`}
          align="center"
          variant="h2"
        >
          {cases} Daily
        </Typography>
        <Typography className={classes.infoBoxTotal}>{total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
