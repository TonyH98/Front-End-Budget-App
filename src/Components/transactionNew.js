import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL

function TransactionNew(){
    let navigate = useNavigate()

    const [transaction, setTransaction] = useState({
      item_name: "",
      amount: "",
      date: "",
      category: "",
    });

    const handleTextChange = (event) => {
        setTransaction({ ...transaction, [event.target.id]: event.target.value });
      };

      const handleSelect = (event) => {
        setTransaction({...transaction, category: event.target.value })
      }


      const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${API}/transaction` , transaction)
        .then(() => navigate('/transaction'))
        .catch(err => console.log(err))
      };


      let currentDate = new Date().toJSON().slice(0, 10)
   

      return(
        <div className="New">
        <form onSubmit={handleSubmit}>
          <br></br>
          <label htmlFor="item_name">Item Name:</label>
          <input
            id="item_name"
            value={transaction.item_name}
            type="text"
            onChange={handleTextChange}
            required
          />
          <br></br>
          <br></br>
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            required
            value={transaction.amount}
            onChange={handleTextChange}
          />
          <br></br>
          <br></br>
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            max={currentDate}
            value={transaction.date}
            onChange={handleTextChange}
          />
          <br></br>
          <br></br>
          <label htmlFor="category">Category:</label>
          <select id="category" onChange={handleSelect}>
          <option value=""></option>
          <option value="Income">Income</option>
          <option value="Taxes">Taxes</option>
          <option value="Education">Education</option>
          <option value="Insurance">Insurance</option>
          <option value="House">House</option>
          <option value="Kids">Kids</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Pets">Pets</option>
          <option value="Car">Car</option>
          <option value="Groceries">Groceries</option>
          <option value="Other">Other</option>
        </select>
          <br></br>
          <br></br>
        <br></br>
          <br></br>
          <div className="new-buttons">
          <input type="submit" />

          <Link to={"/transaction"}>
            <button className="cancel">Cancel</button>
          </Link>

          </div>
        </form>
      </div>
      )

}

export default TransactionNew