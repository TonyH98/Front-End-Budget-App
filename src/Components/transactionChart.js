import { Link } from "react-router-dom";


function TransactionChart(){
    return(
        <div>
            <Link to={"/transaction"}>
            <button className="cancel">Back</button>
          </Link>
        </div>
    )
}

export default TransactionChart