import React, { Component } from 'react';

import * as InputHandler from './inputHandlers';


export default class Abilities extends Component {

    constructor(props){
        super();
        this.handleClick = InputHandler.abilityClick.bind(InputHandler);
        this.seeItems = this.seeItems.bind(this);
        this.items = InputHandler.getItems();
    }
    

    

    seeItems(){
        console.log(this.items);
    }
    
    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={this.seeItems}>Primary</button>
                <button type="button" className="btn btn-secondary" onClick={(e) => this.handleClick(1, e)}>Secondary</button>
                <button type="button" className="btn btn-success">Success</button>
                <button type="button" className="btn btn-info">Info</button>
                <button type="button" className="btn btn-warning">Warning</button>
                <button type="button" className="btn btn-danger">Danger</button>
                <button type="button" className="btn btn-link">Link</button>
            </div>
        );
    }
}