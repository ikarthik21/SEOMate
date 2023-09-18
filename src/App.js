import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Details from "./components/Details";
 
function App() {




  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
   
        <Route path="/" element={<Home />} />
        <Route path="/:url" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
