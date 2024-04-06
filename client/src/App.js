import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ErrorPage from './pages/ErrorPage';
import Navbar from './component/Navbar';
import { Home } from "./pages/common/Home";
import SidebarWithHeader from './component/SideNav'
import Profile from "./pages/mentor/Profile";
import Chat from "./pages/mentor/Chat";
import Clients from "./pages/mentor/Clients";
import Payment from "./pages/mentor/Payment";
import Reviews from "./pages/mentor/Reviews";

function App() {
   
  return (
    <div>
      <BrowserRouter>
        <Routes>

          {/* user routes are here */}
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
          </Route>

          {/* mentor routes are here */}
          <Route path="/mentor/" element={<SidebarWithHeader />}>
            <Route index element={<Chat />} />
            <Route path='profile' element={<Profile />}/>
            <Route path='clients' element={<Clients />}/>
            <Route path='payments' element={<Payment />}/>
            <Route path='reviews' element={<Reviews />}/>
          </Route>

          
          <Route path='/login' element={<Login />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
