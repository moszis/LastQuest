export default class AssetServices{
    
    
        getAssetsByZone(zoneCode){
            console.log("generating assets for zone: "+zoneCode);
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
                {id: 'batSS', src: '/client/assets/batSS.png'}
            ];
        }
    
    }