import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CountryInfo.css";

const CountryInfo = ({ className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState([]);
  const { countryName } = useParams();

  useEffect(() => {
    const getCountryByName = async () => {
      const response = await fetch(
        `https://restcountries.com/v2/name/${countryName}?fullText=true`
      );
      const data = await response.json();
      setCountry(data);
      setIsLoading(false);
    };

    getCountryByName();
  }, [countryName]);

  return (
    <div>
      <Link className="link-back" to="/rest-countries-api">
        Back
      </Link>
      <ul>
        {country?.map((el) => (
          <div className="whole-countryinfo" key={el.numericCode}>
            <img
              alt="country flag"
              src={el.flags.svg}
              className="country-flag"
            />
            <div className="countryinfo-txt-container">
              <h1 className="country-name">{el.name}</h1>
              <div className="text-containers">
                <div className="txt-container1">
                  <p className="country-native-name">
                    <b>Native Name:</b> {el.nativeName}
                  </p>
                  <p className="country-population">
                    <b>Population:</b> {el.population}
                  </p>
                  <p>
                    <b>Region:</b> {el.region}
                  </p>
                  <p>
                    <b>Sub Region:</b> {el.subregion}
                  </p>
                  <p>
                    <b>Capital:</b> {el.capital}
                  </p>
                </div>

                <div className="txt-container2">
                  <p>
                    <b>Top Level Domain:</b> {el.topLevelDomain}
                  </p>
                  <p>
                    <b>Currencies:</b>
                    {el.currencies.map((item) => ` ${item.code}`)}
                  </p>
                  <p>
                    <b>Languages:</b>
                    {el.languages.map((lang, index) =>
                      index === el.languages.length - 1
                        ? ` ${lang.name}`
                        : ` ${lang.name}, `
                    )}
                  </p>
                </div>
              </div>
              <div className="border-countries">
                <div className="border-countries-font">
                  <b>Border Countries:</b>{" "}
                  {el.borders.map((item) => (
                    <p className={`${className} border-country-names`}>
                      {item}
                    </p>
                  ))}
                </div>
                {/* <div className="border-countries-font border-countries">
                  {el.borders.map((item) => (
                    <p>{item}</p>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CountryInfo;
