import React, { useState } from "react";
import Styles from './app.css';

const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
  };

  return (
    <form className={Styles.search}>
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
        placeholder="Insert a valid Ethereum Address"
      />

      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};

export default Search;
