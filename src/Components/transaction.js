import { Link } from "react-router-dom"


function Transaction({ta , index}){
   return (
    <tr>
      <td>
        {ta.date}
      </td>
      <td>
        
         <Link to={`/transaction/${index}`}>{ta.item_name}</Link>
        
      </td>
      <td>
       ${ta.amount}
      </td>
    </tr>
   )
}

export default Transaction