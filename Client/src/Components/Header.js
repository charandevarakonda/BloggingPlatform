import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { authActions } from "../store";


const Header = () => {
  const isLoggedIn=useSelector(state=>state.isLoggedIn)
  const dispath = useDispatch();

  return (
    <AppBar sx={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,91,1) 35%, rgba(0,212,255,1) 100%)", position: "sticky", top: 0 }}>
      <Toolbar>
        <Typography variant="h5">
        Blogging Platform
        </Typography>
        {isLoggedIn && <Box display="flex" marginLeft="auto" marginRight="auto">
          <Tabs>
            <Tab component={Link} to="/blogs" label="All Blogs" />
            <Tab component={Link} to="/myblogs" label="My Blogs" />
            <Tab component={Link} to="/blogs/add" label="Add Blog" />
          </Tabs>
        </Box>}

        <Box display="flex" marginLeft="auto">
        {!isLoggedIn && <> <Button component={Link} to="/auth" variant='contained' color="warning" sx={{ margin: '1', borderRadius: 10 }}>
            Login
          </Button>
          <Button component={Link} to="/auth" variant='contained' color="warning" sx={{ margin: '1', borderRadius: 10 }}>
            SignUp
          </Button></>}

         { isLoggedIn && <Button 
         onClick={() => dispath(authActions.logout())}
         LinkComponent={Link}
          to="/auth"

          variant='contained' color="warning" sx={{ margin: '1', borderRadius: 10 }}>
            Log Out
          </Button>}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
