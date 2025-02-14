import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Header from "./components/header";
import Form from "./layout/form";
import Ticket from "./layout/ticket";

function App() {
  return (
    <>
      <Router>
     <Header />
    
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/myticket" element={<Ticket />} />
        </Routes>
        </Router>
    
     
    
    </>
  );
}

export default App;
