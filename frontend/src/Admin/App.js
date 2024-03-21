import Home from "./Pages/home/Home";
import {  Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Category from "./Pages/Category";
import District from "./Pages/District";
import Place from "./Pages/Place";
import State from "./Pages/State";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import ViewLot from "./Pages/ViewLot";
import { Box, Card } from "@mui/material";
import AssignAuction from "./Pages/AssignAuction";
import DailyReport from "./Pages/DailyReport";
import LotReport from "./Pages/LotReport";


const styles = {
  margin: 2,
  height: '75vh',
  overflowY: 'scroll', // Allow scrolling
  padding: 3,
  borderRadius: 5,
  // Hide the default scrollbar
  scrollbarWidth: 'none',
  '-ms-overflow-style': 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="homeMain">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <Card sx={styles}>

          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path=":userId" element={<Single />} /> */}
            <Route path='/Category' element={<Category />} />
            <Route path='/District' element={<District />} />
            <Route path='/Place' element={<Place />} />
            <Route path='/State' element={<State />} />
            <Route path='/ViewLot' element={<ViewLot />} />
            <Route path='/AssignAuction/:id' element={<AssignAuction />} />
            <Route path="/"  element={<DailyReport />} />
            <Route path="/LotReport/:id"  element={<LotReport />} />
          </Routes>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;