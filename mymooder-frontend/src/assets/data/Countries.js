import { feature } from "topojson-client";
import data from "./countries-10m";
// import countries from "./countries.geo.json";

// From https://github.com/johan/world.geo.json/blob/master/countries.geo.json
// import countries from "./countries.geo.json";

export const COUNTRIES = feature(data.objects, data.objects.countries.countries).features;

// Working import:
// feature(data.objects, data.objects.countries.countries).features