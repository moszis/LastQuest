import React, { Component } from 'react';

import * as InputHandler from '../inputHandlers';
import EventManager from '../../system/events/EventManager';

//const eventManager = new EventManager();

export default class AbilityButton extends Component {

    constructor(props){
        super(props);
        console.log(props);
        //this.handleClick = InputHandler.abilityClick.bind(InputHandler);
        this.handleClick = this.handleClick.bind(this);
        this.seeItems = this.seeItems.bind(this);
        this.drag = this.drag.bind(this);
        this.items = InputHandler.getItems();
        this.abilityId = props.abilityId;
        this.abilityName = props.abilityName;
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

    handleClick(abilityId, event){
        EventManager.publish("PLAYER_ABILITY_ACTIVATED", abilityId);

        
        if(abilityId == 11){
            console.log("***************"+abilityId);

            EventManager.publish("ZONE_CHANGE", { zoneCode : "testCombatArea" });
        }

        if(abilityId == 12){
            console.log("***************"+abilityId);

            EventManager.publish("ZONE_CHANGE", { zoneCode : "sourceCave" });
        }
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={(e) => this.handleClick(this.abilityId, e)} >{this.abilityName}</button>
            </div>
        );
    }
}