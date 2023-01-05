import { useState, useEffect } from "react";
import { Link, useParams , useNavigate} from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL

function TransactionDetails(){
    const [transaction , setTransaction] = useState([]);
    let navigate = useNavigate()
    let { index } = useParams();


    function handleDelete(){
      axios.delete(`${API}/transaction/${index}`)
        .then(() => {
          navigate(`/transaction`);
        })
        .catch((err) => console.error(err));
     }
    


    useEffect(() => {
        axios.get(`${API}/transaction/${index}`)
        .then(res => setTransaction(res.data))
      }, [index , navigate]);

     return(
        <article>
         <div className="details">
        <h1>Show</h1>
        <h2>
          {transaction.category}
        </h2>
        <h3>{transaction.amount}</h3>
        <p>{transaction.date}</p>
        <p>{transaction.item_name}</p>
         </div>
      <br></br>

        <div className="buttons">
            <div >
                <Link to={"/transaction"}>
                    <button className="transaction-buttons">Back</button>
                </Link>
            </div>
            <div >
                <Link to={`/transaction/${index}/edit`}>
                    <button className="transaction-buttons">Edit</button>
                </Link>
            </div>
            <div >
          <button className="transaction-buttons" onClick={handleDelete}>Delete</button>
            </div>
        </div>

      </article>
     )

}

export default TransactionDetails