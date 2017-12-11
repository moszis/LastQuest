import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AbilityBar from './abilities/AbilityBar';

class UI extends Component {

    
    render() {
        return (
            <div>
              <AbilityBar/>
            </div>
        );
    }
}

    
ReactDOM.render(<UI />, document.getElementById('ui'));


global.dragElement = function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // set the element's new position:
      if((elmnt.offsetTop - pos2) > 0 && (elmnt.offsetTop - pos2 + elmnt.offsetHeight) < window.innerHeight){
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      }
      
      if((elmnt.offsetLeft - pos1) > 0 && (elmnt.offsetLeft - pos1 + elmnt.offsetWidth) < window.innerWidth){
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
      
      
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  global.dragElement(document.getElementById("abilitiesBar"));
