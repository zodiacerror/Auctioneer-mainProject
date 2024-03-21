import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { setSocket } from './Context/Context'
import {socket} from './Socket/Socket'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <setSocket.Provider value={{socket}}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </setSocket.Provider>
)
