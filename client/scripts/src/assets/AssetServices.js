/*
//TODO: This should just be a service module not an instanced object
//Play around with concurrency
export default function AssetService{

    //This may not need a contructor.
    constructor(sceneProperties) {
        this.zoneCode = sceneProperties.zoneCode;
        this.eventCode = sceneProperties.eventCode;
    }

    //TODO: Asset object array should be pulled from database
    //TODO: Temporarily it can be stored as a JSON file on the server side to simulate client/server interaction and latency
    //TODO: Return promise
    getAssetList(){ 
        
        
        fetch('http://localhost:5000/services/assets/zone:arena', {
            method: 'get'
        }).then(function(response) {
            console.log(response.json());
            return response.json();
        }).catch(function(err) {
            return null;
            // Error :(
        });



            return [
                {id: 'backgroundImage', src: '/client/assets/blueBack.jpg'},
                {id: 'crossHair', src: '/client/assets/crosshair.png'},
                {id: 'shot', src: '/client/assets/shot.mp3'},
                {id: 'background', src: '/client/assets/countryside.mp3'},
                {id: 'gameOverSound', src: '/client/assets/gameOver.mp3'},
                {id: 'tick', src: '/client/assets/tick.mp3'},
                {id: 'deathSound', src: '/client/assets/die.mp3'},
                {id: 'batSpritesheet', src: '/client/assets/batSpritesheet.png'},
                {id: 'batDeath', src: '/client/assets/batDeath.png'},
            ]
            
        
    }
};
*/


export function getAssetList(){ 
        
    fetch('http://localhost:5000/services/assets/zone:arena', {
        method: 'get'
    }).then(function(response) {
        console.log(response.json());
        return response.json();
    }).catch(function(err) {
        return null;
        // Error :(
    });
 
    return [
        {id: 'backgroundImage', src: '/client/assets/blueBack.jpg'},
        {id: 'crossHair', src: '/client/assets/crosshair.png'},
        {id: 'shot', src: '/client/assets/shot.mp3'},
        {id: 'background', src: '/client/assets/countryside.mp3'},
        {id: 'gameOverSound', src: '/client/assets/gameOver.mp3'},
        {id: 'tick', src: '/client/assets/tick.mp3'},
        {id: 'deathSound', src: '/client/assets/die.mp3'},
        {id: 'batSpritesheet', src: '/client/assets/batSpritesheet.png'},
        {id: 'batDeath', src: '/client/assets/batDeath.png'},
    ]
}  
