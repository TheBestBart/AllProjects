import React from 'react';
import {Navbar} from '../Navbar/Navbar';
import {StartOptions} from '../LogIn/StartOptions'
import {Link} from 'react-router-dom';

export class MainPage extends React.Component{
    render(){
        return (
            <div className="container-fluid">
                <Navbar component={<StartOptions />}/>
            </div>
        )
    }
}