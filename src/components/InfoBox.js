import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  infoBox: {
    flex: 1,
    cursor: "pointer",
  },
  infoBoxSelected: {
    borderTop: "5px solid #3f51b5",
  },
  infoBoxCases: {
    color: "#008ffb",
    fontWeight: 600,
    fontSize: 28,
    marginTop: 5,
  },
  infoBoxRecovered: {
    color: "#00e396",
    fontWeight: 600,
    fontSize: 28,
    marginTop: 5,
  },
  infoBoxDeaths: {
    color: "#feb019",
    fontWeight: 600,
    fontSize: 28,
    marginTop: 5,
  },
  infoBoxTitleCases: {
    color: "#008ffb",
    fontWeight: "bold",
  },
  infoBoxTitleRecovered: {
    color: "#00e396",
    fontWeight: "bold",
  },
  infoBoxTitleDeaths: {
    color: "#feb019",
    fontWeight: "bold",
  },
  infoBoxTotal: {
    color: "#05386B",
    fontWeight: 700,
    fontSize: 16,
    marginTop: 5,
  },
});

function InfoBox({ active, title, cases, total, ...props }) {
  const classes = useStyles();

  return (
    <Card
      onClick={props.onClick}
      className={`${classes.infoBox} ${active && classes.infoBoxSelected}
      }`}
    >
      <CardContent>
        <Typography
          className={
            title === "Cases"
              ? classes.infoBoxTitleCases
              : title === "Recovered"
              ? classes.infoBoxTitleRecovered
              : classes.infoBoxTitleDeaths
          }
          align="center"
          variant="h5"
        >
          {title}
        </Typography>
        <Typography
          className={
            title === "Cases"
              ? classes.infoBoxCases
              : title === "Recovered"
              ? classes.infoBoxRecovered
              : classes.infoBoxDeaths
          }
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
