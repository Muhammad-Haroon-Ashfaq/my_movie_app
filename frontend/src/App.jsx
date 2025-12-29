import { Outlet } from "react-router";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css" 
import Navigation from "./pages/Auth/Navigation";
const App = () => {
  return (
    <>
    <ToastContainer/>
    
    <main className="py-3">
      <Outlet/>
    </main>
    <Navigation/>
</>
  );
};

export default App;
