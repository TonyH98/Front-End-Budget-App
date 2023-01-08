import { useState , useEffect} from "react";
import ReactPaginate from "react-paginate";
import Transaction from "./transaction";
import axios from "axios";

const API = process.env.REACT_APP_API_URL


 const pageData = 5

function Transactions(){
  const [transaction , setTransaction] = useState([])
  const [filter , setFilter] = useState([])
  const [searchFilter , setSearchFilter] = useState([])
   const [currentPage, setCurrentPage] = useState(0)
   const [search , setSearch] = useState("")
  
  useEffect(()=> {
    axios.get(`${API}/transaction`)
    .then((res) => setTransaction(res.data))
    .catch(err => console.log(err))
  }, [])
  
  useEffect(()=> {
    axios.get(`${API}/transaction`)
    .then((res) => setSearchFilter(res.data))
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

  const category = ["Income" , "Taxes", "Eduction", "Insurance", "House", "Kids", "Entertainment", "Pets", "Car", "Groceries", "Other"]
  
  
  
  function handleCategory(category){
    setFilter(category)
  }
  
  function filterCategory(e){
    const filter = transaction.filter((t) => t.category === e.target.value);
    handleCategory(filter)
  }



 function handlePageChange ({selected: selectedPage}){
   setCurrentPage(selectedPage)
 }

 const offSet = currentPage * pageData

 const currentPageData = filter
.slice(offSet, offSet + pageData)
 .map((ta , index) => <Transaction key={index} ta={ta} index={index}/>)


 const pageCount = Math.ceil(filter.length/pageData) || Math.ceil(transaction.length/pageData) 


function filterSearch(search , name){
  return(
    name.filter((e) => e.item_name.toLowerCase().match(search.toLowerCase()))
  )
}


function handleTextChange(event){
  const name = event.target.value
  const result = name ? filterSearch(name , searchFilter ) : searchFilter
  setFilter(result)
 setSearch(name)
}


    return(
        <div>
          <div className="searchBar">
          <label htmlFor="search">
            Search Item:
            <input
              type="text"
               value={search}
              id="search"
              onChange={handleTextChange}
            />
            </label>
          </div>
         {handleColor()}
          <div>
          { currentPageData.length < 5  ? null :
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
            <option value="">Select-Item</option>
            {category.map((c) => {
              return(
                <option value={c}>{c}</option>
              )
            })} 
          </select>
          <br></br>
          <button onClick={() => {handleCategory(transaction)}}>All</button>
          <table>
       <tr className="three-sections">
         <th>Date</th>
         <th>Category</th>
         <th>Name</th>
         <th>Amount</th>
       </tr>
       {filter.length > 0 ? filter.map((ta , index) => {
        return(
<Transaction key={index} ta={ta} index={index}/>
        )
       }) : <h2>No Data Found!</h2>}
          </table>
          
      </div>
    )
}

export default Transactions 