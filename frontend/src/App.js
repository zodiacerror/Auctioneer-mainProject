import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Admin from './Admin/App'
import Guest from './Guest/App'
import User from './User/App'
import Dealer from './Dealer/App'
import Auction from './User/components/Auction/Auction'


const App = () => {

   return (
  
         <Routes>
         <Route
         path='/Admin/*'
            element={<Admin />}
         />
         <Route
            path='/*'
            element={<Guest />}
         />
         <Route
            path='/User/*'
            element={<User />}
         />
         <Route
            path='/Dealer/*'
            element={<Dealer />}
            />
            <Route
            path='/Auction/'
            element={<Auction />}
            />
      </Routes>
   )
}
export default App
