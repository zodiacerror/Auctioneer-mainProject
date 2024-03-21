import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../Component/posts/Posts"
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "@mui/material";
import { Link } from "react-router-dom";

const Profile = () => {
  const [rows, setRows] = useState([])
  const Did = sessionStorage.getItem('dId')

  const [myProfile, setMyProfile] = useState([])

  const fetchMyProfile = () => {
     axios.get(`http://localhost:5000/Dealer/${Did}`).then((response) => {
        console.log(response.data.dealer)
        setMyProfile(response.data.dealer)
     })
  }


  const fetchLot = () => {
    axios.get(`http://localhost:5000/AuctionDealerData/${Did}`).then((response) => {
       console.log(response.data.auctionhead)
       setRows(response.data.auctionhead)
    })
 }

  useEffect(() => {
    fetchLot()
    fetchMyProfile()
 }, [])

  return (
    <div className="profile">
      <div className="images">
        <Card
         
          className="cover"
        >
          Auctioneer
        </Card>
        <img
        src={myProfile.profileimgsrc}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            {/* <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a> */}
          </div>
          <div className="center">
            <span>{myProfile.Name}</span>
            <div className="info">
              <div className="item">
                {/* <PlaceIcon />
                <span>USA</span> */}
              </div>
              <div className="item">
                {/* <LanguageIcon />
                <span>lama.dev</span> */}
              </div>
            </div>
            <Link to={'/Dealer/AddLot/'}>
            <Button size="small">Add Lot</Button>
            </Link>
          </div>
          <div className="right">
            {/* <EmailOutlinedIcon /> */}
            {/* <MoreVertIcon /> */}
          </div>
        </div>
        
        <Posts rows={rows} />
      </div>
    </div>
  );
};

export default Profile;