import React, { useRef, useState, useEffect } from "react";
import "./Menu.scss";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ContactsIcon from "@material-ui/icons/Contacts";
import BugReportIcon from "@material-ui/icons/BugReport";
import ListIcon from "@material-ui/icons/List";
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';


export const Menu = () => {
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
    <div class="wrapper">
   <nav class="nav nav1">
   
      <a href="/Landing" class="nav-item active" data-color="#663399"><HomeIcon/></a>
      <a href="" class="nav-item" data-color="#446A46"><InfoIcon/></a>
      <a href="" class="nav-item" data-color="#D82148"><BugReportIcon/></a>
      <a href="" class="nav-item" data-color="#FFB72B" onClick={() => logout()} ><ExitToAppIcon/></a>
      <a href="/Contact" class="nav-item" data-color="#1C0A00"><ContactsIcon/></a>
      <span class="nav-indicator"></span>
   </nav>
</div>

</div>

    
  );
};
