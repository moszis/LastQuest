import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Abilities from './Abilities';

class UI extends Component {

    
    render() {
        return (
            <div>
              <Abilities />
            </div>
        );
    }
}

    
ReactDOM.render(<UI />, document.getElementById('ui'));
