import { feature } from "topojson-client";
import data from "./countries-110m";

// This works, but the features are an array without the GeometryCollection's geometries object
export const Countries = feature(data.objects, data.objects.countries.countries).features;
