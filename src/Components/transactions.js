import { useState , useEffect} from "react";
import { Link } from "react-router-dom";
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


const map = transaction.map((data) => {
  return data.category
})



function filterTotal(option){
  const filter = transaction.filter((e) => {
    return(
      e.category === option
    )
  })
  return filter
}


let income = 0

filterTotal("income").forEach((e) => {
income += Number(e.amount)
})

console.log(income)

let pets = 0
 filterTotal("pets").forEach((e) => {
   pets += Number(e.amount)
  })
  console.log(pets)





const unique = map.filter((v, i, a) => a.indexOf(v) === i)



console.log(unique)


    return(
        <div>
         {handleColor()}
          <div>
            <p>🟩: Money was added</p>
            <p>🟥: Money was substracted</p>
          </div>
          <table>
       <tr className="three-sections">
         <th>Date</th>
         <th>Name</th>
         <th>Amount</th>
       </tr>
       {transaction.map((ta , index) => {
         return(
           <Transaction key={index} ta={ta} index={index}/>
         )
       })}
          </table>

        <Link to="/transaction/chart">
        <button>Chart</button>
        </Link>
      </div>


    )
}

export default Transactions 