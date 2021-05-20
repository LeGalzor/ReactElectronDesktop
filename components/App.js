import React, { useReducer, useEffect } from "react";
import Transaction from "./Transaction";
import spinner from "../assets/ajax-loader.gif";
import Search from "./Search";
import { initialState, reducer } from "../store/reducer";
import axios from "axios";
import Styles from './app.css';

const ETHERSCAN_API_URL = `https://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&sort=asc&apikey=RM4SUQGRRBK7W9VNVJG39ZZBRX4I176CW6`;

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(ETHERSCAN_API_URL).then(jsonResponse => {
      dispatch({
        type: "SEARCH_ETHEREUM_SUCCESS",
        payload: jsonResponse.data.result
      });
    });
  }, []);

  // you can add this to the onClick listener of the Header component
  const refreshPage = () => {
    window.location.reload();
  };

  const search = searchValue => {
    dispatch({
      type: "SEARCH_ETHEREUM_REQUEST"
    });

    axios(`https://api.etherscan.io/api?module=account&action=txlist&address=${searchValue}&startblock=0&endblock=99999999&sort=asc&apikey=RM4SUQGRRBK7W9VNVJG39ZZBRX4I176CW6`).then(
      jsonResponse => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "SEARCH_ETHEREUM_SUCCESS",
            payload: jsonResponse.data.result
          });
        } else {
          dispatch({
            type: "SEARCH_ETHEREUM_FAILURE",
            error: jsonResponse.data.Error
          });
        }
      }
    );
  };

  const { transactions, errorMessage, loading } = state;

  const retrievedTransactions =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      transactions.map((transaction, index) => (
        <Transaction key={`${index}-${transaction.value}`} transaction={transaction} />
      ))
    );

  return (

    <div className={Styles.App}>
      <div className={Styles.container}>
        <h1>Transactions</h1>
        <Search search={search} />
        <div className={Styles.transactions}>{retrievedTransactions}</div>
      </div>
    </div>
  );
};

export default App;
