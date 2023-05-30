import React, { useRef, useState, useEffect } from "react";
import "./NewMenu.scss";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ContactsIcon from "@material-ui/icons/Contacts";
import BugReportIcon from "@material-ui/icons/BugReport";
import ListIcon from "@material-ui/icons/List";
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';


export const NewMenu = () => {
  const h = useHistory();
  const logout = () => {
    localStorage.removeItem("tokenapi");
    h.push("/");
  };
  useEffect(() => {
    if (localStorage.getItem("tokenapi")) {
    } else {
      h.replace("/");
    }
  }, []);

  return (
    <div>
      <script src="https://kit.fontawesome.com/628c8d2499.js" crossorigin="anonymous"></script>

<link rel="stylesheet" href="style.css" type="text/css" />
<nav id="menu">
  <div class="menu-item">
    <div class="menu-text">
      <a href="#">Home</a>
    </div>
    <div class="sub-menu">
      <div class="icon-box">
        <div class="icon"><i class="fal fa-wind-turbine"></i></div>
        <div class="text">
          <div class="title">------<i class="far fa-arrow-right"></i></div>
          <div class="sub-text">-----------
</div>
        </div>
      </div>
    
   
      <div class="sub-menu-holder"></div>
    </div>
  </div>
  <div class="menu-item">
    <div class="menu-text">
    <a href=""  onClick={() => logout()} >logout</a>
    </div>
    <div class="sub-menu">
      <div class="icon-box">
        <div class="icon"><i class="fal fa-wind-turbine"></i></div>
        <div class="text">
          <div class="title">Thank You<i class="far fa-arrow-right"></i></div>
          <div class="sub-text">SalesForce Team 
</div>
        </div>
      </div>
    
   
      <div class="sub-menu-holder"></div>
    </div>
  </div>
  <div class="menu-item highlight">
    <div class="menu-text">
      <a href="#">Services</a>
    </div>
    <div class="sub-menu double">
      <div class="icon-box gb a">
        <div class="icon"><i class="far fa-question-circle"></i></div>
        <div class="text">
          <div class="title">-- <i class="far fa-arrow-right"></i></div>
          <div class="sub-text">---------</div>
        </div>
      </div>
      <div class="icon-box gb b">
        <div class="icon"><i class="far fa-users-class"></i></div>
        <div class="text">
          <div class="title">-- <i class="far fa-arrow-right"></i></div>
          <div class="sub-text">------------</div>
        </div>
      </div>
      <div class="icon-box gb c">
        <div class="icon"><i class="far fa-school"></i></div>
        <div class="text">
          <div class="title">---- <i class="far fa-arrow-right"></i></div>
          <div class="sub-text">-------</div>
        </div>
      </div>
      <div class="icon-box gb d">
        <div class="icon"><i class="far fa-chess-rook"></i></div>
        <div class="text">
          <div class="title">---- <i class="far fa-arrow-right"></i></div>
          <div class="sub-text">-------</div>
        </div>
      </div>
      <div class="icon-box gb e">
        <div class="icon"><i class="far fa-video-plus"></i></div>
        <div class="text">
          <div class="title">---- <i class="far fa-arrow-right"></i></div>
          <div class="sub-text">--------</div>
        </div>
      </div>
      <div class="icon-box gb f">
        <div class="icon"><i class="far fa-cat"></i></div>
        <div class="text">
          <div class="title">---- <i class="far fa-arrow-right"></i></div>
          <div class="sub-text">-------</div>
        </div>
      </div>
 
      <div class="sub-menu-holder"></div>
    </div>
  </div>

  <div class="menu-item">
    <div class="menu-text">
      <a href="#">Community</a>
    </div>
    <div class="sub-menu">
      <div class="icon-box">
        <div class="icon"><i class="far fa-satellite"></i></div>
        <div class="text">
          <div class="title">---- <i class="far fa-arrow-right"></i></div>
          <div class="sub-text">-------------.</div>
        </div>
      </div>
      <div class="icon-box">
        <div class="icon"><i class="fab fa-twitter-square"></i></div>
        <div class="text">
          <div class="title">Twitter <i class="far fa-arrow-right"></i></div>
          <div class="sub-text">Follow us on twitter.</div>
        </div>
      </div>
 
      <div class="sub-menu-holder"></div>
    </div>
  </div>
  <div id="sub-menu-container">
    <div id="sub-menu-holder">
      <div id="sub-menu-bottom">

      </div>
    </div>
  </div>
</nav>

    {/* <div class="wrapper">
   <nav class="nav nav1">
   
      <a href="/Landing" class="nav-item active" data-color="#663399"><HomeIcon/></a>
      <a href="" class="nav-item" data-color="#446A46"><InfoIcon/></a>
      <a href="" class="nav-item" data-color="#D82148"><BugReportIcon/></a>
      <a href="" class="nav-item" data-color="#FFB72B" onClick={() => logout()} ><ExitToAppIcon/></a>
      <a href="/Contact" class="nav-item" data-color="#1C0A00"><ContactsIcon/></a>
      <span class="nav-indicator"></span>
   </nav>
</div> */}

</div>

    
  );
};
