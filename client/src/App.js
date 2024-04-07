import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ErrorPage from './pages/ErrorPage';
import Navbar from './component/Navbar';
import SidebarWithHeader from './component/SideNav'
import Profile from "./pages/mentor/Profile";
import Chat from "./pages/mentor/Chat";
import Clients from "./pages/mentor/Clients";
import Payment from "./pages/mentor/Payment";
import Reviews from "./pages/mentor/Reviews";
import ProfileMentee from "./pages/mentee/Profile";
import Home from "./pages/user/Home";
import AllMentors from "./pages/common/AllMentors";


function App() {
   
  return (
    <div>
      <BrowserRouter>
        <Routes>

          {/* Public routes are here */}

          <Route path="/mentors" element={<AllMentors/>}/>

          {/* user routes are here */}
          <Route path="/mentee" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path='profile' element={<ProfileMentee/>} />
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
