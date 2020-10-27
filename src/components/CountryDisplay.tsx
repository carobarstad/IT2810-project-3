import React, { useEffect } from "react";
import {
  reduxState,
  GetCountryList,
  CountriesResponse,
  CountrySummaryInfo,
} from "../Interfaces";
import { getCountryList } from "../Fetch";
import Country from "./Country";
import { connect, useDispatch, useSelector } from "react-redux";
import { setCountriesAction, setSkipAction } from "../app/store";

function CountryDisplay() {
  const dispatch = useDispatch();
  const setCountries = (countries: CountriesResponse) => {
    dispatch(setCountriesAction(countries));
  };
  const countries = useSelector((state: reduxState) => state.currentCountries);
  const searchString = useSelector((state: reduxState) => state.searchString);
  const sort = useSelector((state: reduxState) => state.sort);
  const skip = useSelector((state: reduxState) => state.skip);
  const setSkip = (skip: number) => {
    dispatch(setSkipAction(skip));
  };
  const limit = useSelector((state: reduxState) => state.limit);

  const handleResponse = (countriesResponse: CountriesResponse) => {
    if (countriesResponse) setCountries(countriesResponse);
  };

  useEffect(() => {
    const countryListRequest: GetCountryList = {
      sort,
      searchString,
      handleResponse,
      limit,
      skip,
    };
    getCountryList(countryListRequest);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, sort]);

  const handleNextClick = () => {
    const nextSkip = skip + 1 * limit;
    setSkip(nextSkip);
  };

  const handlePreviousClick = () => {
    const previousSkip = skip - 1 * limit;
    setSkip(previousSkip);
  };

  return (
    <div className="CountryDisplay">
      {!!countries && (
        <ul>
          {countries.map((country: CountrySummaryInfo) => {
            return <Country key={country.alpha2Code} {...country} />;
          })}
        </ul>
      )}
      {!!! countries.length  && (
        <p>No countries to display</p>
      )}
      <div>
        {!!skip && (
          <button
            className="button"
            type="button"
            onClick={handlePreviousClick}
          >
            Previous
          </button>
        )}
        {!!!(countries.length < limit) && (
          <button className="button" type="button" onClick={handleNextClick}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default connect()(CountryDisplay);
