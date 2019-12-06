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
import { ResponseComponent } from './Components/ResponseComponent';
import { Options } from './Components/Navbar/Options'

class App extends React.Component {
	
	constructor(props){
		super(props);

		this.state = {
			newEmail: false,
			newPassword: false,
			newPlatform: false,
			newAccountResponse: false
		}

		this.onChangeNewEmail = this.onChangeNewEmail.bind(this);
		this.onChangeNewPass = this.onChangeNewPass.bind(this);
		this.onChangeNewPlatform = this.onChangeNewPlatform.bind(this);
	}

	onChangeNewEmail = (email) => {
		this.setState({newEmail: email.target.value});
	}

	onChangeNewPass = (pass) => {
		this.setState({newPassword: pass.target.value});
	}

	onChangeNewPlatform = (platform) => {
		this.setState({newPlatform: platform.target.value});
	}

	setResponse = (nodeResponse) => {
		this.setState({newAccountResponse: nodeResponse});
	}

	createObjectToNewAccount = () => {
		let { newEmail, newPassword , newPlatform } =  this.state;

		return {
			newEmail: newEmail,
			newPassword: newPassword,
			newPlatform: newPlatform,
			}
		}

	sendToSerwer = (url) => {
		console.log(url);
		let data = this.createObjectToNewAccount(this.state);
		let response;
		data ? response = postData(url, data)
			 : response = 'Wypełnij wszystkie pola';
		response.then((res => {
			this.setState({newAccountResponse: res});
		}));
		
	}

    render(){
		let { newAccountResponse } = this.state; 

	    return(
	        <Router>
		        <Navbar />
				{ newAccountResponse &&
					<ResponseComponent response={newAccountResponse} />
				}
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
                        <Form 
							sendPost={this.sendToSerwer}
							onChangeNewEmail={this.onChangeNewEmail}
							onChangeNewPass={this.onChangeNewPass}
							onChangeNewPlatform={this.onChangeNewPlatform}
						/>
                    </Route>
		            <Route path="/SendEmail" component={SendEmail}>
						<Options />
						<SendEmail />
					</Route>
		            <Route path="/Form" component={Form}/>
		        </div>
	        </Router>
	  
	    )
    }
}

export default App;
