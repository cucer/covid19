import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Map as LeafletMap, TileLayer, Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const useStyles = makeStyles({
  map: {
    height: 500,
    backgroundColor: "rgba(26, 26, 29, 0.85)",
    padding: 2,
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
    color: "#008ffb",
  },
  infosRecovered: {
    fontSize: 16,
    marginTop: 5,
    color: "#00e396",
  },
  infosDeaths: {
    fontSize: 16,
    marginTop: 5,
    color: "#feb019",
  },
});

const casesTypeColors = {
  cases: {
    hex: "#008ffb",
    multiplier: 800,
  },
  recovered: {
    hex: "#00e396",
    multiplier: 1200,
  },
  deaths: {
    hex: "#feb019",
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
