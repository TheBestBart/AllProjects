import React from 'react';
import {Title} from './Title'
import PropTypes from 'prop-types';


export class Navbar extends React.Component {


    render() {
        let {component} = this.props;
        console.log('');
        return <div className="container">
           <Title />
        </div>
    }
}