import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import Room from './components/Room';
import { ToastContainer } from 'react-tiny-toast';


function App() {
  return (
      <div className="App">
        <ToastContainer />
      <Router>
        <Switch>
          <Route path="/room" render={(props) => {return <Room {...props} />}}/>
          <Route path="/join/:code" render={(props) => { return <Home {...props} /> }} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
