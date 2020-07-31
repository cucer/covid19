import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import numeral from "numeral";

const useStyles = makeStyles((theme) => ({
  graphTitle: {
    color: "#C3073F",
  },
}));

const options = {
  legend: {
    display: false,
  },
  elements: {
    points: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function LineGraph({ casesType = "cases" }) {
  const classes = useStyles();
  const [data, setData] = useState({});

  const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);

  return (
    <div>
      <Typography
        className={classes.graphTitle}
        gutterBottom
        variant="h5"
        component="h3"
      >
        Worldwide last 120 days {casesType}
      </Typography>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor:
                  casesType === "recovered"
                    ? "rgba(16, 203, 125, 0.5)"
                    : "rgba(204, 16, 52, 0.5)",
                borderColor: casesType === "recovered" ? "#5CDB95" : "#6F2232",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
