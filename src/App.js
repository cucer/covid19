import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Backdrop,
  CircularProgress,
  Grid,
  Link,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Clock from "react-live-clock";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import StatTable from "./components/StatTable";
import LineGraph from "./components/LineGraph";
import { sortData, prettyPrintStat } from "./utils/util";
import "./css/App.css";
import "leaflet/dist/leaflet.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#1A1A1D",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  container: {
    marginBottom: theme.spacing(2),
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#6F2232",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  header: {
    marginTop: 30,
    color: "#ffffff",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  tableTitle: {
    color: "#C3073F",
  },
  graphTitle: {
    color: "#C3073F",
  },
  footer: {
    padding: theme.spacing(1),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 5,
    position: "relative",
    color: "#ffffff",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    "&:focus": {
      borderRadius: 5,
      backgroundColor: "#6F2232",
    },
  },
}))(InputBase);

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary">
      <Link color="inherit" href="https://cagatayucer.com/">
        {"Copyright © Cagatay Ucer"}
      </Link>{" "}
      <Clock format={"DD.MM.YYYY"} interval={1000} ticking={true} />
    </Typography>
  );
};

function App() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryName, setCountryName] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 38.963745, lng: 35.24332 });
  const [mapZoom] = useState(5);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });
      setLoading(false);
    };
    getAllData();
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      setLoading(true);
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countriesData = data.map((c) => ({
            name: c.country,
            value: c.countryInfo.iso2,
            tag: c.countryInfo.iso3,
          }));

          const sortedData = sortData(data);
          setLoading(false);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countriesData);
        });
    };
    getCountriesData();
  }, []);

  const handleCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    setLoading(true);
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryName(data.country);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      });
    setLoading(false);
  };

  const handleCloseLoading = () => {
    setLoading(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Backdrop
        className={classes.backdrop}
        open={loading}
        onClick={handleCloseLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Covid-19 Tracker
          </Typography>
          <FormControl className={classes.formControl}>
            <Select
              value={country}
              onChange={handleCountryChange}
              autoWidth
              input={<BootstrapInput />}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country, i) => (
                <MenuItem key={i} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      {/* INFOBOX */}
      <Container
        align="center"
        component="main"
        className={classes.container}
        maxWidth="lg"
      >
        <Typography
          className={classes.header}
          align="center"
          variant="h3"
          gutterBottom
        >
          {countryName} Overview{" "}
          <Clock format={"DD.MM.YYYY"} interval={1000} ticking={true} />
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={4}>
            <InfoBox
              isRed
              active={casesType === "cases"}
              onClick={(e) => setCasesType("cases")}
              title="Cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintStat(countryInfo.cases)}
            />
          </Grid>
          <Grid item xs={4}>
            <InfoBox
              active={casesType === "recovered"}
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintStat(countryInfo.recovered)}
            />
          </Grid>
          <Grid item xs={4}>
            <InfoBox
              isRed
              active={casesType === "deaths"}
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={prettyPrintStat(countryInfo.deaths)}
            />
          </Grid>
        </Grid>
      </Container>

      {/* MAP */}
      <Container component="main" className={classes.container} maxWidth="lg">
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.tableTitle}
              gutterBottom
              variant="h5"
              component="h3"
            >
              Click on a country for more info
            </Typography>
            <Map
              casesType={casesType}
              countries={mapCountries}
              center={mapCenter}
              zoom={mapZoom}
            />
          </CardContent>
        </Card>
      </Container>

      {/* TABLE */}
      <Container component="main" className={classes.container} maxWidth="lg">
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.tableTitle}
              gutterBottom
              variant="h5"
              component="h3"
            >
              Live statistics
            </Typography>
            <StatTable countries={tableData} />
          </CardContent>
        </Card>
      </Container>

      {/* GRAPH */}
      <Container component="main" className={classes.container} maxWidth="lg">
        <Card className={classes.card}>
          <CardContent>
            <LineGraph casesType={casesType} />
          </CardContent>
        </Card>
      </Container>

      <Container component="main" className={classes.container} maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Container>

      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}

export default App;
