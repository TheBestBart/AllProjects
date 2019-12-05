import React from 'react';


export class InputText extends React.Component {
    render() {
        return (
        <div className="form-group col-sm-6">
            <label>Odbiorca: </label>
            <input type="email" className="form-control" placeholder="@"/>
        </div>) 
    }
}