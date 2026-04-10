import { Outlet } from "react-router";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css" 
import Navigation from "./pages/Auth/Navigation";

const App = () => {
  return (
    // 'flex-col' lagane se Navigation upar fix ho jayegi aur main content niche aayega
    <div className="flex flex-col min-h-screen bg-[#0f0f0f]">
      <ToastContainer />
      
      {/* Top Navigation */}
      <Navigation />
      
      {/* Page Content */}
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default App;