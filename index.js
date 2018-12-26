const tj = require("@mapbox/togeojson");
const fs = require("fs");
const DOMParser = require("xmldom").DOMParser;
const program = require("commander");
let extraStations = [],
  extraNames = {};

program
  .version("1.0.0")
  .option("-k, --kml [file]", "path to KML file to parse")
  .option("-n, --names [file]", "path to extra names files")
  .option("-s, --stations [file]", "path to extra stations files")
  .parse(process.argv);

if (program.kml.length === 0) {
  program.outputHelp();
  process.exit(1);
}

const kml = new DOMParser().parseFromString(
  fs.readFileSync(program.kml, "utf8")
);

if (program.stations.length !== 0) {
  extraStations = JSON.parse(fs.readFileSync(program.stations, "utf8"));
}

if (program.stations.length !== 0) {
  extraNames = JSON.parse(fs.readFileSync(program.stations, "utf8"));
}

const converted = tj.kml(kml);

const stations = converted.features.map(v => {
  const [lng, lat] = v.geometry.coordinates;
  const displayName = v.properties.name.trim();
  const nameAlt = displayName.replace(" Station", "");
  let extra = [];
  if (displayName in extraNames) {
    extra = extraNames[displayName];
  }
  const names = [displayName, nameAlt].concat(extra);
  return {
    displayName,
    lat,
    lng,
    names
  };
});

const allStations = stations.concat(extraStations);
console.log(allStations);
