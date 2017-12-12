export default class AssetServices{
        constructor(){
            this.assetsFolder = 'clinet/assets/';
        }

        getAssetsByZone(zoneCode){
            console.log("generating assets for zone: "+zoneCode);
            return [
                {id: 'backgroundImage', src: '/client/assets/blueBack.jpg'},
                {id: 'crossHair', src: '/client/assets/crosshair.png'},
                {id: 'slash-sword-miss', src: '/client/assets/sounds/slash-sword-miss.wav'},
                {id: 'countryside', src: '/client/assets/countryside.mp3'},
                {id: 'gameOverSound', src: '/client/assets/gameOver.mp3'},
                {id: 'tick', src: '/client/assets/tick.mp3'},
                {id: 'batDeathSound', src: '/client/assets/die.mp3'},
                {id: 'batSS', src: '/client/assets/batSS.png'},
                {id: 'test', src: '/client/assets/test.png'},
                {id: 'test1', src: '/client/assets/test1.png'},
                {id: 'testb', src: '/client/assets/testb.png'}
            ];
        }
    
    }