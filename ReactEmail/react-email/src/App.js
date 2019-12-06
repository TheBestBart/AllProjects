import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar } from './Components/Navbar/Navbar'
import { SendEmail } from './Components/SendEmail/SendEmail';
import { Form } from './Components/AddAccount/Form';
import { StartOptions } from './Components/LogIn/StartOptions';
import { LogIn } from './Components/LogIn/LogIn';
import { postData, createObjectToNewAccount } from './Functions/functions'
import { ResponseComponent } from './Components/ResponseComponent';


class App extends React.Component {
	
	constructor(props){
		super(props);

		this.state = {
			newEmail: 0,
			newPassword: 0,
			newPlatform: 0,
			newAccountResponse: 0
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

	sendToSerwer = (url) => {
		let data = createObjectToNewAccount(this.state);
		let response;
		data ? response = postData(url, data)
			 : response = 'Wypełnij wszystkie pola';
		this.setstate({newAccountResponse: response});
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
		            <Route path="/SendEmail" component={SendEmail}/>
		            <Route path="/Form" component={Form}/>
		        </div>
	        </Router>
	  
	    )
    }
}

export default App;
