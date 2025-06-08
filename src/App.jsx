
import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nopage from "./pages/Nopage";

const App =()=>{
   return(
    <Router>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/ele" element={<Home/>}/>
        <Route path="*" element={<Nopage/>} />
     </Routes>
   </Router>
   )
}

export default App;