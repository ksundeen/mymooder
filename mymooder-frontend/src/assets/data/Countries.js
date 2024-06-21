import { feature } from "topojson-client";
import countries from "./countries-10m.json";
export const COUNTRIES = feature(countries.objects, countries.objects.countries.countries).features;