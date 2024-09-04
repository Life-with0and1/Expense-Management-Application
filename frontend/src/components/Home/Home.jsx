import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Expense from "../Expense/Expense";
import "./Home.css";
import Balance from "../Balance/Balance";

function Home() {
  const url = "https://expense-management-api-u0p0.onrender.com/api";
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenseAmt, setExprenseAmt] = useState(0);

  const [newExpense, setNewExpense] = useState({
    text: "",
    amount: "",
  });

  const addData = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const newUrl = `${url}/add`;
    try {
      const response = await axios.post(newUrl, newExpense, {
        headers: {
          token: token,
        },
      });
      if (response.data.success) {
        toast.success("Expense added succesfully.");
        fetchData(token);
        setNewExpense({
          text: "",
          amount: "",
        });
      }
    } catch (error) {
      toast.error("Try logging again.");
      localStorage.removeItem("token");
      navigate("/authentication");
    }
  };

  const fetchData = async (token) => {
    const newUrl = `${url}/get`;
    try {
      const response = await axios.get(newUrl, {
        headers: {
          token: token,
        },
      });
      setData(response.data.data.expense);
      setName(response.data.data.name);
    } catch (error) {
      toast.error("Try logging again.");
      localStorage.removeItem("token");
      navigate("/authentication");
    }
  };

  const delteExpense = async (id) => {
    const token = localStorage.getItem("token");
    const newUrl = `${url}/reduce/${id}`;
    try {
      const response = await axios.delete(newUrl, {
        headers: {
          token: token,
        },
      });
      toast.success("Expense deleted successfully.");
      fetchData(token);
    } catch (error) {
      toast.error("Try logging again.");
      localStorage.removeItem("token");
      navigate("/authentication");
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewExpense({
      ...newExpense,
      [name]: value,
    });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/authentication");
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    const amounts = data.map((item) => item.amount);
    const incum = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0);
    const expnce =
      amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1;
    setExprenseAmt(expnce);
    setIncome(incum);
  }, [data]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchData(token);
  }, []);
  return (
    <div className="home">
      <div className="top">
        <h1>
          Welcome <span>{name}</span>
        </h1>
        <button onClick={() => logOut()}>Logout</button>
      </div>

      <form onSubmit={addData}>
        <input
          onChange={onChangeHandler}
          value={newExpense.text}
          name="text"
          type="text"
          placeholder="Expense"
          required
        />
        <input
          onChange={onChangeHandler}
          value={newExpense.amount}
          type="number"
          name="amount"
          placeholder="Amount"
          required
        />
        <button type="submit">Add</button>
      </form>
      <Balance income={income} expenseAmt={expenseAmt} />
      <Expense data={data} delteExpense={delteExpense} />
    </div>
  );
}

export default Home;
