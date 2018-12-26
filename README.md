# TFL station parser

## Get stations.kml

TFL is providing a [stations.kml](http://data.tfl.gov.uk/tfl/syndication/feeds/stations.kml) via their Open Data portal [https://tfl.gov.uk/info-for/open-data-users/](https://tfl.gov.uk/info-for/open-data-users/).

## Usage

```shell
$ node index.js --help
Usage: index [options]

Options:
  -V, --version          output the version number
  -k, --kml [file]       path to KML file to parse
  -n, --names [file]     path to extra names files
  -s, --stations [file]  path to extra stations files
  -h, --help             output usage information
```

Example:

```shell
$ node index.js --kml stations.kml --names extra_names.json --stations extra_stations.json > stations.json
```

## Files format

### Names (extra_names.json)

```json
{
  "Name Station": ["Alternative", "Names"],
  ...
}
```

### Stations (extra_stations.json)

```json
[
  {
    "displayName": "High Street Kensington Station",
    "lat": 51.500673420263205,
    "lng": -0.19250313559081075,
    "names": [
      "High Street Kensington Station",
      "High Street Kensington"
    ]
  },
  ...
]
```

### Output (stations.json)

```json
[
  {
    "displayName": "Acton Town Station",
    "lat": 51.50274977300057,
    "lng": -0.2802512035361106,
    "names": [ "Acton Town Station", "Acton Town" ]
  },
  {
    "displayName": "Aldgate Station",
    "lat": 51.51427182308339,
    "lng": -0.0756141844777496,
    "names": [ "Aldgate Station", "Aldgate" ]
  },
  ...
```
