import { useState , useEffect} from "react";
import { useParams, useNavigate , Link } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL

function TransactionEdit(){
    let navigate = useNavigate()
    let { index } = useParams();

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

      useEffect(() => {
        axios.get(`${API}/transaction/${index}`)
        .then(res => setTransaction(res.data))
        .catch(err => console.log(err))
      }, [index]);


      const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`${API}/transaction/${index}` , transaction)
        .then((res) => {
            setTransaction(res.data)
            navigate(`/transaction/${index}`)
        })
        .catch(err => console.log(err))
       
      };


      let currentDate = new Date().toJSON().slice(0, 10)
      const category = ["Income" , "Taxes", "Eduction", "Insurance", "House", "Kids", "Entertainment", "Pets", "Car", "Groceries", "Other"]
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
          <select onChange={handleSelect}>
            <option value=""></option>
            {category.map((c) => {
              return(
                <option value={c}>{c}</option>
              )
            })} 
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

export default TransactionEdit