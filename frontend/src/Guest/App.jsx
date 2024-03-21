import React from 'react';
import { Route, Routes } from 'react-router-dom';
import User from './Pages/User';
import Dealer from './Pages/Dealer';
import Login from './Pages/Login';

const App = () => {
    return (
        <Routes>
            <Route path='/UserRegistration' element={<User />} />
            <Route path='/DealerRegistration' element={<Dealer />} />
            <Route path='/' element={<Login/>} />
        </Routes>
    )
}
export default App