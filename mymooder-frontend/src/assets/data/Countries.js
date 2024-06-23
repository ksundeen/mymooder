import { feature } from "topojson-client";
import data from "./countries-110m";
// import countries from "./countries.geo.json";

// From https://github.com/johan/world.geo.json/blob/master/countries.geo.json
// import countries from "./countries.geo.json";

// This works, but the features are an array without the GeometryCollection's geometries object
export const COUNTRIES = feature(data.objects, data.objects.countries.countries).features;
