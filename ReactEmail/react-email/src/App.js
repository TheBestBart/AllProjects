import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar } from './Components/Navbar/Navbar'
import { SendEmail } from './Components/SendEmail/SendEmail';
import { Form } from './Components/AddAccount/Form';
import { StartOptions } from './Components/LogIn/StartOptions';
import { LogIn } from './Components/LogIn/LogIn';
import { postData } from './Functions/functions'


class App extends React.Component {
	
	constructor(props){
		super(props);

		this.state = {
			newEmail: '',
			newPassword: '',
			newPlatform: '',
			newAccountResponse: ""
		}

		this.onChangeNewEmail = this.onChangeNewEmail.bind(this);
		this.onChangeNewPass = this.onChangeNewPass.bind(this);
		this.onChangeNewPlatform = this.onChangeNewPlatform.bind(this);
	}

	onChangeNewEmail = (email) => {
		this.setState({newEmail: email});
	}

	onChangeNewPass = (pass) => {
		this.setState({newPassword: pass});
	}

	onChangeNewPlatform = (platform) => {
		this.setState({newPlatfrom: platform});
	}

	setResponse = (nodeResponse) => {
		this.setState({newAccountResponse: nodeResponse});
	} 

	createObjectToNewAccount = () => {
		let { newEmial, newPassword , newPlatform } =  this.state;

		return {
			newEmail: newEmial,
			newPassword: newPassword,
			newPlatform: newPlatform
		}
	}

	sendTOSerwer = (url = '', data = {}) => {
		let response = postData(url, data);
		this.setResponse({newAccountResponse: response});
	}

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
