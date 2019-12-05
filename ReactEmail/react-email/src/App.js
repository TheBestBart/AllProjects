import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {Navbar} from './Components/Navbar/Navbar'
import {SendEmail} from './Components/SendEmail/SendEmail';
import {Form} from './Components/AddAccount/Form'
class App extends React.Component {

  render(){
    return(
      <Router>
  <      div className="container App">
          <Navbar/>
          <Route path="/SendEmail" component={SendEmail}/>
          <Route path="/Form" component={Form}/>
        </div>

      </Router>
      
    )
  }
}

export default App;
