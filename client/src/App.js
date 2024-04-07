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
import ProfileMentor from "./pages/mentee/ProfileMentor";
import AllMentors from "./pages/common/AllMentors";
import MenteeChat from './pages/mentee/Chat'
import Checkout from "./pages/mentee/Checkout";
import Transactions from "./pages/mentee/Transactions";


function App() {
   
  return (
    <div style={{margin:'0px', padding:"0px"}}>
      <BrowserRouter>
        <Routes>

          {/* Public routes are here */}


          {/* user routes are here */}
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route style={{margin:'0px', padding:"0px"}} path="/mentors" element={<AllMentors/>}/>
            <Route path="/mentors/profile/:id" element={<ProfileMentor/>}/>
            <Route path="/chat/:id" element={<MenteeChat/>}/>
            <Route path="/payment/:id" element={<Checkout/>}/>
          </Route>

          <Route path="/mentee" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path='profile' element={<ProfileMentee/>} />
            <Route path='transactions' element={<Transactions/>} />
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
