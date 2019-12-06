import React from "react";
import PropTypes from "prop-types";

export class Form  extends React.Component {

    static propTypes = {
        onChangeNewEmail: PropTypes.func.isRequired,
        onChangeNewPass: PropTypes.func.isRequired,
        onChangeNewPlatform: PropTypes.func.isRequired,
        sendPost: PropTypes.func.isRequired,
    };

    render() {
        let { onChangeNewEmail, onChangeNewPass, onChangeNewPlatform, sendPost } =  this.props;

        return (
            <div className="container mt-2 pt-2 rounded" style={{border: "1px solid black", minheight: "400px", width:"400px"}}>
                <header className="text-center">
                    <h1>Dodaj konto</h1>
                </header>
                <div className="container">

                    <div className="mt-5">
                        <label>Podaj E-mail: </label>
                        <input onChange={() => onChangeNewEmail(e.target.value)} className="form-control" type="email" placeholder="@" style={{borderRadius: "20px", borderTop:"none"}}/>
                    </div>

                    <div className="mt-3">
                        <label>Podaj Haslo: </label>
                        <input onChange={() => onChangeNewPass(e.target.value)} className="form-control" type="password" placeholder="#" style={{borderRadius: "20px", borderTop:"none"}}/>
                    </div>

                    <div className="mt-3">
                    <   label>Podaj Platforme: </label>
                        <input onChange={() => onChangeNewPlatform(e.target.value)} className="form-control" type="password" placeholder="@xxxx.com" style={{borderRadius: "20px", borderTop:"none"}}/>
                    </div>

                    <div className="my-5 text-center">
                        <button onClick={sendPost} className="btn " style={{borderRadius: "20px", borderTop:"none", border:"1px solid blue", }}>Dodaj Konto</button>
                    </div>   
                </div>
            </div>
   
        );
    }
}

