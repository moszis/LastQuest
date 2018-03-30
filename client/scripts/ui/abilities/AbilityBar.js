import React, { Component } from 'react';

import * as InputHandler from '../inputHandlers';
import AbilityButton from './AbilityButton';

export default class AbilityBar extends Component {

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

            <div id="abilitiesBar" style={this.windowLocation()}>
                <div id="abilitiesBarheader" >
                    <div></div>
                </div>
                <div className="modal-body">
                    <AbilityButton abilityId="1"/>
                    <AbilityButton abilityId="2"/>
                    <AbilityButton abilityId="12"/>
                </div>
            </div>

        );
    }
}