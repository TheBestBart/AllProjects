import React from 'react';
import {Link} from 'react-router-dom'

export class Options extends React.Component {
    render() {
        return(

        <div className="container nvb-options-div">
            <div className="row py-2">
                <Link to = "/login" className="btn btn-dark m-1 col-sm-2">
                    <div className="">Zaloguj</div>
                </Link>
                <Link to="/Form" className="btn btn-dark m-1 col-sm-2">
                    <div className="">Dodaj Konto</div>
                </Link>             
            </div>     
        </div>
        ) 
        
    }
}