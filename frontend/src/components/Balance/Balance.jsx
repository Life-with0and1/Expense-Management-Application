import React from "react";
import "./Balance.css";

function Balance({ income, expenseAmt }) {
  const total = income - expenseAmt;
  return (
    <div className="main">
      <div className="balance">
        Your current balance is :{" "}
        <span style={{ color: total < 0 ? "#ff0000" : "#27ae60" }}>
          {total}
        </span>
      </div>
      <div className="child">
        <div>
          Income : <span className="inc">{income}</span>
        </div>
        <div>
          Expense : <span className="enc">{expenseAmt}</span>
        </div>
      </div>
    </div>
  );
}

export default Balance;
