import './App.css';
import Navigate from './Components/navigate';
import Home from './Components/Home';
import Transactions from './Components/transactions'

import TransactionDetails from './Components/transactionDetails';
import TransactionNew from './Components/transactionNew';
import TransactionEdit from './Components/transactionEdit';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";




function App() {
 

  return (
    <div className="App">
      <Router>
        <Navigate/>
     
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="transaction" element={<Transactions />}/>
            <Route path="/transaction/:index" element={<TransactionDetails/>}/>
            <Route path="/transaction/new" element={<TransactionNew/>}/>
            <Route path="/transaction/:index/edit" element={<TransactionEdit/>}/>
  
            <Route path="*"/>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
