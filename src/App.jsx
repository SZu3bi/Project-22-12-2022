import './App.css';
import React from "react";
import { Route ,Switch } from "react-router-dom";
import { Login } from '../src/Views/Login/Login';
import { Contact } from './Views/Contact/Contact';
import { Menu } from '../src/Views/Menu/Menu';
import { Landing } from './Views/Landing';
import Blank from './Views/pages/Blank';

function App() {
  return (
    <Switch >

<Route path="/Menu" component={Menu} />

    <Route path="/Blank" component={Blank} />
    <Route path="/Contact" component={Contact} />
    <Route path="/Landing" component={Landing} />
    <Route path="/" component={Login} />

    </Switch >

  );
}

export default App;
