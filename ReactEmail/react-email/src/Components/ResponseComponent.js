import React from "react";
import PropTypes from "prop-types";

export class ResponseComponent  extends React.Component {

    static propTypes = {
        response = PropTypes.string.isRequired
    };

    render() {
        let { response } =  this.props;

        return (
            <div className="container mt-2 rounded">
                <p>{response}</p>  
            </div>
   
        );
    }
}