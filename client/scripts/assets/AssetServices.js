const BASE_URL = "http://localhost:5000/services/";

//TODO: get service URLs from settings file
export async function getAssetListByZone(zoneCode){ 

    const response = await fetch(BASE_URL+'assets/zone:'+zoneCode, {
        method: 'get'
    });

    const assetData = await response.json();

    return assetData;

} 

    /* sample for testing
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
    */

