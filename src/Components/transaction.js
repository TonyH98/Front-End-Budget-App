import { Link } from "react-router-dom"
import { useNavigate }  from "react-router-dom";

import axios from "axios";
const API = process.env.REACT_APP_API_URL
function Transaction({ta , index}){


  let navigate = useNavigate()

const date = new Date(ta.date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"2-digit"})



function handleBackGroundColor(option){
  if(ta.amount < 0){
    return(

      <td style={{backgroundColor:"lightpink"}}>{option}</td>
    )
  }
  if(ta.amount >= 0){
    return(
      <td style={{backgroundColor:"lightgreen"}}>{option}</td>
    )
  }
}

function handleDelete(){
  axios.delete(`${API}/transaction`)
  .then(() => {
    navigate(`/transaction`);
  })
  .catch((err) => console.error(err));
   
 }


   return (
    <tr>
      <td>
     {date}
      </td>
      <td>
        {ta.category}
      </td>
      <td>
         <Link to={`/transaction/${index}`}>{ta.item_name}</Link>
      </td>
      <td>
       ${handleBackGroundColor(ta.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
       <button className="transaction-buttons" onClick={handleDelete}>Delete</button>
      </td>
  
    </tr>
   )
}

export default Transaction