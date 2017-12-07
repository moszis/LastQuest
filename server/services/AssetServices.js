export default class AssetServices{
    
    
        getAssetsByZone(zoneCode){
            console.log("generating assets for zone: "+zoneCode);
            return [
                {id: 'backgroundImage', src: '/client/assets/blueBack.jpg'},
                {id: 'crossHair', src: '/client/assets/crosshair.png'},
                {id: 'shot', src: '/client/assets/shot.mp3'},
                {id: 'countryside', src: '/client/assets/countryside.mp3'},
                {id: 'gameOverSound', src: '/client/assets/gameOver.mp3'},
                {id: 'tick', src: '/client/assets/tick.mp3'},
                {id: 'batDeathSound', src: '/client/assets/die.mp3'},
                {id: 'batSS', src: '/client/assets/batSS.png'}
            ];
        }
    
    }