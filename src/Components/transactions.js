import { useState , useEffect} from "react";
import Transaction from "./transaction";
import axios from "axios";
const API = process.env.REACT_APP_API_URL

function Transactions(){
    const [transaction , setTransaction] = useState([])

    useEffect(()=> {
     axios.get(`${API}/transaction`)
     .then((res) => setTransaction(res.data))
     .catch(err => console.log(err))
     }, [])



     const getTotal = (account) => {
      let sum = 0;
      for (let acc of account) {
        sum += Number(acc.amount)
      }
      return sum.toFixed(2)
    };
  const total = getTotal(transaction)
console.log(transaction)


    return(
        <div>
          <h2>Bank Account Total: ${total}</h2>
        <section>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <body className="transaction-table">
              {transaction.map((ta, index) => {
                return <Transaction key={index} ta={ta} index={index} />;
              })}
            </body>
          </table>
        </section>
      </div>


    )
}

export default Transactions