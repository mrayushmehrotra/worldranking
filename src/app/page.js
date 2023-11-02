"use client"
import "./globals.css"
import styles from "./page.module.css"

import { useEffect, useState } from 'react';

function CountryTable() {
  const [countryData, setCountryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const flagCountryPopulation = data.map(country => ({
          name: country.name.common,
          flag: country.flags.svg,
          population: country.population
        }));
        setCountryData(flagCountryPopulation);
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };

    fetchData();
  }, []);

  const filteredCountries = countryData.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
 
    <div className={styles.div}>
      
      <input className={styles.search}
        type="text"
        placeholder="&#128269;"
        value={searchQuery}
        onChange={handleSearchChange}
        /><br /><br />

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Country</th>
            <th className={styles.th} >Flag</th>
            <th className={styles.th}>Population</th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country, index) => (
            <tr key={index}>
              <td className={styles.td}>{country.name}</td>
              <td className={styles.td}><img className={styles.img} src={country.flag} alt={`${country.name} Flag`} /></td>
              <td className={styles.td}>{country.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      
  );
}

export default CountryTable;



