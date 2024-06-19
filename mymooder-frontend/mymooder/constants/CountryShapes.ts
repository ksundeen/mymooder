/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { feature } from "topojson-client";
import { countries } from "../assets/data/countries-10m.json";

export const COUNTRIES = feature(countries, countries.objects.countries).features;
