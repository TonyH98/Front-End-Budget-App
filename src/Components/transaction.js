import { Link } from "react-router-dom"


function Transaction({ta , index}){

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








   return (
    <tr>
      <td>
        {ta.date}
      </td>
      <td>
        
         <Link to={`/transaction/${index}`}>{ta.item_name}</Link>
        
      </td>
      <td>
       ${handleBackGroundColor(ta.amount)}
      </td>
    </tr>
   )
}

export default Transaction