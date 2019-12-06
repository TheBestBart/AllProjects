import React from "react";
import PropTypes from "prop-types";

export class ResponseComponent  extends React.Component {

    static propTypes = {
        response: PropTypes.string.isRequired
    };

    render() {
        let { response } =  this.props;

        return (
            <div className="container mt-2 rounded text-center" style={{backgroundColor: "green"}}>
                <h1>{response}</h1>  
            </div>
   
        );
    }
}