import React, { Component } from 'react';

import * as InputHandler from '../inputHandlers';


export default class Abilities extends Component {

    constructor(props){
        super();
        this.handleClick = InputHandler.abilityClick.bind(InputHandler);
        this.seeItems = this.seeItems.bind(this);
        this.drag = this.drag.bind(this);
        this.items = InputHandler.getItems();
    }
    

    drag(){
        global.dragElement(document.getElementById(("AbilitiesBar")));
    }

    seeItems(){
        console.log(this.items);
    }
    
    windowLocation(){
        let top = global.innerHeight * 0.8;
        let left = global.innerWidth / 4;
        
        const divStyle = {
            top,
            left
        };
        return divStyle;
    }

    render() {
        return (
<div>
                    <button type="button" className="btn btn-primary" {(e) => this.handleClick(1, e)} >Primary</button>
</div>
        );
    }
}