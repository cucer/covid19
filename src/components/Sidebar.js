import React from "react";
import { Doughnut } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    marginBottom: 30,
  },
});

function Sidebar({ title, cases, recovered, deaths }) {
  const classes = useStyles();

  const data = {
    labels: ["Cases", "Recovered", "Deaths"],
    datasets: [
      {
        data: [cases, recovered, deaths],
        backgroundColor: ["#008ffb", "#00e396", "#feb019"],
        hoverBackgroundColor: ["#008ffb", "#00e396", "#feb019"],
      },
    ],
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography align="center" variant="h5">
          {title}
        </Typography>
        <Doughnut data={data} />
      </CardContent>
    </Card>
  );
}

export default Sidebar;
