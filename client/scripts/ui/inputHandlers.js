import EventManager from '../system/events/EventManager';



window.addEventListener("keyup", handleKeyUp);
window.addEventListener("keydown", handleKeyDown);
//window.addEventListener("keypress", handleKeyPress);

function handleKeyUp(e){                                
   console.log(e);
console.log("KEY UP");
   //EventManager.publish("PLAYER_ABILITY_ACTIVATED", e.key);

}

function handleKeyDown(e){

    console.log(e);
    console.log("*************KEY DOWN");

    if(e.keyCode === 9){
        EventManager.publish("SWITCH_TO_NEXT_TARGET");
       }

 }

 function handleKeyPress(e){
    //console.log(e);
 }


export function abilityClick(id, e){ 
    
        console.log(id);
    
} 

export function getItems(){
    return {itemName: "item1"}
}



window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
  });