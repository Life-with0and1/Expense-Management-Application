import React from "react";
import "./Expense.css";

function Expense({ data, delteExpense }) {
  return (
    <div className="parent">
      <div className="list">
        {data.length === 0 ? (
          <p>No expenses available</p>
        ) : (
          data.map((item, index) => (
            <div key={index._id} className="item">
              <div className="text">{item.text}</div>
              <div
                className="amount"
                style={{
                  color: item.amount > 0 ? "#27ae60" : "#ff0000",
                }}
              >
                {item.amount}
              </div>
              <button onClick={() => delteExpense(item._id)}>X</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Expense;
