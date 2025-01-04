import Nav from "./Components/Nav";
import {BrowserRouter} from 'react-router-dom';
import Route from "./Components/Route";
import Footer from "./Components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   <>
   <BrowserRouter>
   <Nav/>
   <Route/>
   <Footer/>
   </BrowserRouter>
   </>
  );
}

export default App;
