import React from "react";
import Styles from './app.css';

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://img.icons8.com/ios/452/ethereum.png";

const dateStamp = (UnixTimeStamp) => {
  return new Date(UnixTimeStamp*1000).toLocaleDateString("en-US")
}
const truncate = (str, n) => {
  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
};

const nFormatter = (num, digits) => {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}
 const transactionValueFormatter = (val) =>{
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(val);
}

const Transaction = ({ transaction }) => {
  const poster = DEFAULT_PLACEHOLDER_IMAGE;
  return (
    <div className={Styles.transaction}>
      <h2 title={transaction.hash}>{truncate(transaction.hash, 20)}</h2>
      <div>
        <img
          width="50"
          opacity={transaction.gas === 0 ? 0.5 : 1}
          alt={truncate(transaction.hash, 20)}
          src={poster}
        />
      </div>
      <p>Date: { dateStamp(transaction.timeStamp)}</p>
      <p title={transaction.from}>From: {truncate(transaction.from, 20)}</p>
      <p title={transaction.to}>To: {truncate(transaction.to, 20)}</p>
      <p title={transactionValueFormatter(transaction.value)}>Value: {nFormatter(transaction.value)}</p>
      <p>Confirmations: {transaction.confirmations}</p>
    </div>
  );
};

export default Transaction;
