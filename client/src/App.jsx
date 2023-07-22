import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import OrderPizza from './components/OrderPizza';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/new" element={<OrderPizza/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
