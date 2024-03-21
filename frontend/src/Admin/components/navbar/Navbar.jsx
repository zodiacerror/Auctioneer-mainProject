import "./navbar.scss";


import { Avatar, Box, Button, Card, IconButton, Popover } from "@mui/material";
import { useState } from "react";

const Navbar = () => {


  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Card className="navbarAdmin" sx={{ m: 2, borderRadius: 5 }}>
      <div className="wrapper">
        <div className="search">
          {/* <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon /> */}
        </div>
        <div className="items">

          {/* <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div> */}

          <div className="item">
            <IconButton aria-describedby={id} type="button" onClick={handleClick}>

              <Avatar
              />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClick}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box sx={{ m: 2, width: 180, height: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>

                <Button variant='outlined' sx={{ width: '100%' }}>LogOut</Button>
              </Box>
            </Popover>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Navbar;