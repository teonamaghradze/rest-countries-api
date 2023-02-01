import { useEffect } from "react";
import "./Country.styles.css";
import { Link } from "react-router-dom";
const url = "https://restcountries.com/v2/all";

const Country = ({
  searchTerm,
  country,
  setCountry,
  filteredCountries,
  className,
}) => {
  const fetchCountryData = async () => {
    const response = await fetch(url);
    const country = await response.json();
    setCountry(country);
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  return (
    <div className={`grid-container`}>
      {country
        .filter((item) =>
          searchTerm === "" ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
            ? item
            : null
        )
        .map((item) => {
          const { name, population, region, capital, flag, numericCode } = item;

          return (
            <div className={`${className} country-card `} key={numericCode}>
              <img className="flag-img" alt={name} src={flag} />
              <div className="card-txt">
                <h1>{name}</h1>
                <div className="card-small-txt">
                  <p>
                    <b>population:</b> {population}
                  </p>
                  <p>
                    <b>region:</b> {region}
                  </p>
                  <p>
                    <b>capital:</b> {capital}
                  </p>
                </div>
                <Link className="link" to={`/home/${item.name}`}>
                  <div className={`${className} btn btn-more-info`}>
                    {" "}
                    More Information
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Country;
