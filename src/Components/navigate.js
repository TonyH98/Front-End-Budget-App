import { Link } from "react-router-dom";


export default function Navigate() {
 

  return (
    <nav>
      <h1 className="home-page-link">
        <Link to="/transaction">Budget App</Link>
      </h1>
        <Link to="/transaction/new">
        <button className="new-transaction">
          New transaction
      </button>
          </Link>
      
    </nav>
  );
}
