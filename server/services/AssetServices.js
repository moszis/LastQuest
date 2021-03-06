export default class AssetServices{
        constructor(){
            this.assetsFolder = 'clinet/assets/';
        }

        getAssetsByZone(zoneCode){
            return [
                {id: 'backgroundImage', src: '/client/assets/background.png'},
                {id: 'blueBackground', src: '/client/assets/blueBack.jpg'},
                {id: 'attackNWIndicator', src: '/client/assets/combat/AttackTopLeftCorner.png'},
                {id: 'crossHair', src: '/client/assets/crosshair.png'},
                {id: 'slash-sword-miss', src: '/client/assets/sounds/slash-sword-miss.wav'},
                {id: 'countryside', src: '/client/assets/sounds/countryside.mp3'},
                {id: 'gameOverSound', src: '/client/assets/gameOver.mp3'},
                {id: 'tick', src: '/client/assets/tick.mp3'},
                {id: 'batDeathSound', src: '/client/assets/die.mp3'},
                {id: 'batSS', src: '/client/assets/batSS.png'},
                {id: 'test', src: '/client/assets/test.png'},
                {id: 'test1', src: '/client/assets/test1.png'},
                {id: 'testb', src: '/client/assets/testb.png'},
                {id: 'paladin', src: '/client/assets/Paladin.png'},
                {id: 'PaladinNordstromAttackNW', src: '/client/assets/PaladinNordstromAttackNW.png'},
                {id: 'PaladinNordstromAttackSE', src: '/client/assets/PaladinNordstromAttackSE.png'},
                {id: 'PaladinNordstromDeath',    src: '/client/assets/PaladinNordstromDeath.png'},
                {id: 'Ogre', src: '/client/assets/ogre.png'}
            ];
        }
    
    }