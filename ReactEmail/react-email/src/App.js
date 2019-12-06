import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {Navbar} from './Components/Navbar/Navbar'
import {SendEmail} from './Components/SendEmail/SendEmail';
import {Form} from './Components/AddAccount/Form';
import { MainPage } from './Components/MainPage/MainPage'
import { StartOptions } from './Components/LogIn/StartOptions';
import { LogIn } from './Components/LogIn/LogIn';
class App extends React.Component {

    render(){
	    return(
	        <Router>
		        <Navbar />
                <div className="container App">
		            <Route path="/" exact>
			            <StartOptions/>
			            <LogIn/>
		            </Route>

                    <Route path="/login" exact>
                        <StartOptions/>
                        <LogIn/>
                    </Route>
                    <Route path="/add-account" exact>
                        <StartOptions/>
                        <Form/>
                    </Route>
		            <Route path="/SendEmail" component={SendEmail}/>
		            <Route path="/Form" component={Form}/>
		        </div>
	        </Router>
	  
	    )
    }
}

export default App;
