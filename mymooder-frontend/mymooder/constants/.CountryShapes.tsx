
import { feature } from "topojson-client";
import countries from "../assets/data/countries-10m";

const countries_json = countries
export const COUNTRIES = feature(countries, countries_json.objects.countries).features;