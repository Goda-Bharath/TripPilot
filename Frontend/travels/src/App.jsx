import { useState } from "react";
import React from "react";
import RegisterForm from "./components/Registerform";
import LoginForm from "./components/Loginform";
import BusList from "./components/Buslist";
import BusSeats from "./components/Busseats";
import UserBookings from "./components/userbookings";
import { Routes, Route } from 'react-router-dom';
import Wrapper from "./components/wrapper";


const App = () => {
 const [token, setToken] = useState(localStorage.getItem('token'))
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const [selectedBusId, setSelectedBusId] = useState(null) //Newly added state

  const handleLogin = (token, userId)=>{
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    setToken(token)
    setUserId(userId)
  }
const handleLogout = ()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  setToken(null)
  setUserId(null)
  setSelectedBusId(null)
}

  return (
    <Wrapper token={token} handleLogout={handleLogout}>
    <Routes>
        <Route path='/' element={<BusList />} />
        <Route path='/register' element={<RegisterForm />}/>
        <Route path='/login' element={<LoginForm onLogin={handleLogin}/>}/>
        <Route path='/bus/:busId' element={<BusSeats token={token}/>} />
        <Route path='/my-bookings' element={<UserBookings token={token} userId={userId} />} />
      </Routes>
    </Wrapper>
  );
}

export default App;