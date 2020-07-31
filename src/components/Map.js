import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Map as LeafletMap, TileLayer, Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const useStyles = makeStyles({
  map: {
    height: 500,
    backgroundColor: "#1A1A1D",
    padding: 5,
    borderRadius: 5,
  },
  infoContainer: {
    width: 150,
  },
  infoFlag: {
    height: 100,
    width: "100%",
    backgroundSize: "cover",
    borderRadius: 5,
    marginBottom: 10,
  },
  infoName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1D",
  },
  infosCases: {
    fontSize: 16,
    marginTop: 5,
    color: "#6F2232",
  },
  infosRecovered: {
    fontSize: 16,
    marginTop: 5,
    color: "#5CDB95",
  },
  infosDeaths: {
    fontSize: 16,
    marginTop: 5,
    color: "#6F2232",
  },
});

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#5CDB95",
    multiplier: 1200,
  },
  deaths: {
    hex: "#C3073F",
    multiplier: 2000,
  },
};

function Map({ countries, casesType, center, zoom }) {
  const classes = useStyles();

  const showDataOnMap = (data, casesType = "cases") =>
    data.map((country, i) => (
      <Circle
        key={i}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup>
          <div className={classes.infoContainer}>
            <div
              className={classes.infoFlag}
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            />
            <div className={classes.infoName}>{country.country}</div>
            <div className={classes.infosCases}>
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div className={classes.infosRecovered}>
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
            <div className={classes.infosDeaths}>
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    ));

  return (
    <div className={classes.map}>
      <LeafletMap center={center} zoom={zoom} style={{ height: "100%" }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
