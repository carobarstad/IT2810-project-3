import { Dictionary } from "@reduxjs/toolkit";

export interface Filters {
  regions: Array<string>; // List of current regions to filter on
  areaGreater: boolean; // value for sorting out countries with area greater or lesser than area
  popGreater: boolean; // value for sorting out countries with population greater or lesser than pop
  area: number; // threshold for area to filer on
  pop: number; // threshold for population to filter on
  areaActive: boolean;
  popActive: boolean;
}

export interface User {
  _id: string;
  wishes: Array<string>;
  flags: Array<string>;
}

export interface reduxState {
  currentCountries: CountriesResponse; // List of alpha2code for the current countries that should be visible
  countryClicked: CountryMoreInfo;
  searchString: string;
  skip: number; // Variable for the current page of the countrydisplay
  limit: number;
  filters: Filters;
  sort: string;
  user: User;
}

export interface CountriesResponse extends Array<CountrySummaryInfo> {}

export interface CountrySummaryInfo {
  alpha2Code: string;
  name?: string;
  capital?: string;
  population?: number;
  region?: string;
}

export interface CountryMoreInfo {
  alpha2Code: string;
  name?: string;
  capital?: string;
  area?: number;
  population?: number;
  region?: string;
  subregion?: string;
  demonym?: string;
  currencies?: string;
  borders?: Dictionary<string>;
}

export interface GetCountryList {
  sort: string;
  searchString: string;
  handleResponse: (countries: CountriesResponse) => void;
  limit: number;
  skip: number;
}

export interface GetCountryMoreInfo {
  alpha2Code: string;
  handleResponse: (country: CountryMoreInfo) => void;
}

export interface FindNeighbours {
  borders: Dictionary<String>;
  // TODO change any
  handleNeighboursResponse: (neighbour: any) => void;
}
