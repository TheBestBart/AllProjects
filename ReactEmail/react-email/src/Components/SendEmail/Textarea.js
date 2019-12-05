import React from 'react';

export class Textarea extends React.Component { 
    render() {
        return  <div className="form-group mt-3">
        <label for="comment">Text wiadomości:</label>
        <textarea className="form-control" rows="10" id="comment"></textarea>
      </div> 
    }
}