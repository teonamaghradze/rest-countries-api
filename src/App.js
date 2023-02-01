import Header from "./components/Header";
import Country from "./components/Country";
import SearchBar from "./components/SearchBar";
import CountryInfo from "./components/CountryInfo";
import sun from "./assets/icon-sun.svg";
import moon from "./assets/icon-moon.svg";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  //HOOKS
  const [country, setCountry] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dayMode, setDayMode] = useState(true);
  const [loading, setLoading] = useState(false);

  //FUNCTIONS
  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleModeClick = () => {
    setDayMode(!dayMode);
  };

  // const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  const optionHandler = (e) => {
    const regionName = e.target.value;
    filterOptionHandler(regionName);
  };

  const filterOptionHandler = (e) => {
    const foundCountries = country.filter((item) => item.region === e);
    setCountry(foundCountries);
    setLoading(true);
  };

  return (
    <div className={!dayMode && "dark-mode"}>
      <Header
        className={!dayMode && "dark-mode-header dark-mode-txt"}
        handleModeClick={handleModeClick}
        src={dayMode ? sun : moon}
        mode={dayMode ? "Light Mode" : "Dark Mode"}
      />
      <div className="body-container">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <SearchBar
                  className={!dayMode && "dark-mode-searchbar"}
                  handleOnChange={handleOnChange}
                  optionHandler={optionHandler}
                  country={country}
                />

                <Country
                  className={!dayMode && "dark-mode-country more-btn"}
                  country={country}
                  setCountry={setCountry}
                  searchTerm={searchTerm}
                  filterOptionHandler={filterOptionHandler}
                  // filteredCountries={filteredCountries}
                />
              </div>
            }
          ></Route>

          <Route
            path="/home/:countryName"
            element={
              <CountryInfo
                className={!dayMode && "borders-dark-mode"}
                country={country}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// FILTER
