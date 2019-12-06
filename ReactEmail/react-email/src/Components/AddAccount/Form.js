import React from "react";
import PropTypes from "prop-types";

export class Form  extends React.Component {

    static propTypes = {};

    render() {
        let {} =  this.props;

        return (
            <div className="container mt-2 pt-2 rounded" style={{border: "1px solid black", minheight: "400px", width:"400px"}}>
                <header className="text-center">
                    <h1>Dodaj konto</h1>
                </header>
                <div className="container">

                    <div className="mt-5">
                        <label>Podaj E-mail: </label>
                        <input className="form-control" type="email" placeholder="@" style={{borderRadius: "20px", borderTop:"none"}}/>
                    </div>

                    <div className="mt-3">
                        <label>Podaj Haslo: </label>
                        <input className="form-control" type="password" placeholder="#" style={{borderRadius: "20px", borderTop:"none"}}/>
                    </div>

                    <div className="mt-3">
                    <   label>Podaj Platforme: </label>
                        <input className="form-control" type="password" placeholder="@xxxx.com" style={{borderRadius: "20px", borderTop:"none"}}/>
                    </div>

                    <div className="my-5 text-center">
                        <button className="btn " style={{borderRadius: "20px", borderTop:"none", border:"1px solid blue", }}>Dodaj Konto</button>
                    </div>   
                </div>
            </div>
   
        );
    }
}

