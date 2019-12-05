import React from 'react';
import { Textarea } from './Textarea';
import { SelectEmail } from './SelectEmail'; 
import { InputText } from './InputText';
import { TitleEmail } from './TitleEmail';

export class SendEmail extends React.Component {
    render() {
        return <div className="container">
            <div className="row">
                <SelectEmail/>
                <InputText/>
            </div>
            <TitleEmail/>
            <Textarea/>
            <div className="m-0 p-0">
                <button className="btn btn-primary mr-sm-1">Wyślij</button>
                <button className="btn btn-primary">Zapisz</button>
            </div>
        </div>
    }
}