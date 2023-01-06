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


  function handleColor(){
    if(total >= 1000){
        return  <h2>Bank Account Total: <span style={{color: "green"}}>${total}</span></h2>
    }
    if(total < 1000){
        if(total >= 0){
            return  <h2>Bank Account Total: <span style={{color: "black"}}>${total}</span></h2>
        }
    }
    if(total < 0){
        return  <h2>Bank Account Total: <span style={{color: "red"}}>${total}</span></h2>
    }
}


const sortDate = transaction.sort((a , b) => {
  return new Date(b.date) - new Date(a.date)
})

    return(
        <div>
          <div>
          {handleColor()}
          </div>
          <table>
       <tr className="three-sections">
         <th>Date</th>
         <th>Name</th>
         <th>Amount</th>
       </tr>
       {sortDate.map((ta , index) => {
         return(

           <Transaction key={index} ta={ta} index={index}/>
         )
       })}

          </table>
      </div>


    )
}

export default Transactions