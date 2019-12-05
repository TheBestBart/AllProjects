import React from 'react';
import {Title} from './Title'
import {Options} from './Options'

export class Navbar extends React.Component {
    render() {
        return <div className="container">
           <Title />
           <Options />
        </div>
    }
}