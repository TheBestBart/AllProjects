import React from 'react';


export class SelectEmail extends React.Component {
    render() {
        return (
        <div className="form-group col-sm-6">
            <label for="sel1">Select list:</label>
            <select className="form-control" id="sel1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>
        </div>) 
    }
}