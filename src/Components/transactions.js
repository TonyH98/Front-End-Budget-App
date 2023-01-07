import { useState , useEffect} from "react";
import ReactPaginate from "react-paginate";
import Transaction from "./transaction";
import axios from "axios";

const API = process.env.REACT_APP_API_URL


const pageData = 5

function Transactions(){
  const [transaction , setTransaction] = useState([])
  const [filter , setFilter] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  
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
        return  <h2>Bank Account Total: <span style={{color: "green"}}>${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></h2>
    }
    if(total < 1000){
        if(total >= 0){
            return  <h2>Bank Account Total: <span style={{color: "black"}}>${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></h2>
        }
    }
    if(total < 0){
        return  <h2>Bank Account Total: <span style={{color: "red"}}>${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></h2>
    }

  }




function handlePageChange ({selected: selectedPage}){
  setCurrentPage(selectedPage)
}

const offSet = currentPage * pageData

const currentPageData = transaction
.slice(offSet, offSet + pageData)
.map((ta , index) => <Transaction key={index} ta={ta} index={index}/>)


const pageCount = Math.ceil(transaction.length/pageData) 


const category = ["Income" , "Taxes", "Eduction", "Insurance", "House", "Kids", "Entertainment", "Pets", "Car", "Groceries", "Other"]

const map = category.map((c) => {
  return c
})

function handleCategory(category){
  setFilter(category)
}

function filterCategory(e){
  const filter = transaction.filter((t) => t.category === e.target.value);
  handleCategory(filter)
}

console.log(filter)

    return(
        <div>
         {handleColor()}
          <div>
            <p>🟩: Money was added</p>
            <p>🟥: Money was substracted</p>
          </div>
          <div>
          {currentPageData.length === 0 ? null :
          <ReactPaginate
         previousLabel={"Previous"}
         nextLabel={"Next"}
         pageCount={pageCount}
         onPageChange={handlePageChange}
         containerClassName={"pagination"}
         previousLinkClassName={"pagination-link"}
         nextLinkClassName={"pagination-link"}
         />  
            }
          </div>
          <select onChange={filterCategory}>
            <option value=""></option>
            {category.map((c) => {
              return(
                <option value={c}>{c}</option>
              )
            })} 
          </select>
          <table>
       <tr className="three-sections">
         <th>Date</th>
         <th>Category</th>
         <th>Name</th>
         <th>Amount</th>
       </tr>
       {currentPageData}
          </table>
      </div>


    )
}

export default Transactions 