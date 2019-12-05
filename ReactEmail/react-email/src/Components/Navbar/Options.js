import React from 'react';
import {Link} from 'react-router-dom'

export class Options extends React.Component {
    render() {
        return <div className="container nvb-options-div">
            <div className="row py-2">
                <Link to = "/Form" className="btn btn-dark m-1 col-sm-2">
                <div className="">dodaj konto</div>
                </Link>
                <Link to="/SendEmail" className="btn btn-dark m-1 col-sm-2">
                    <div className="">napisz wiadomość</div>
                </Link>
                <Link to="/MyMessages" className="btn btn-dark m-1 col-sm-2">
                     <div className="">moje wiadomości</div>
                </Link>
               
            </div>
            
        </div>
    }
}