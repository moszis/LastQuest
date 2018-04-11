export default class DataServices{
    



        getZone(zoneCode){
            
            let testCombatArea = {
                zoneId : 2,
                zoneCode : "testCombatArea",
                defaultEventCode : "combat",
                zoneBackgroundName : "backgroundImage",
                zoneBackgroundImg  : "blueBack.jpg",
                zoneSoundName      : "countryside",
                mobs : [
                    {
                        mobId : 1,
                        mobName : "bat",
                        mobHeath : 100,
                        mobSizeMultiplier : 0.5,
                        mobSpriteSheet : {
                            ssNames : ["batSS"],
                            frameWidth : 198,
                            frameHeight : 120, 
                            animations: {
                                idle  : {
                                    frames: [0,1,2,3,4],
                                    next: true,
                                    speed: 1
                                },
                                attack : {
                                    frames: [0],
                                    next: false,
                                    speed: 1
                                },
                                death : {
                                    frames: [5,6,7,8,9],
                                    next: false,
                                    speed: 0.3
                                }
                            }
                        },
                        mobDeathSound : "batDeathSound"
                    },
                    {
                        mobId : 2,
                        mobName : "Paladin Nordstrom 500",
                        mobHeath : 100,
                        mobSizeMultiplier : 2,
                        mobSpriteSheet : {
                            ssNames : ["paladin"],
                            frameWidth : 500,
                            frameHeight : 500, 
                            animations: {
                                idle  : {
                                    frames: [10,11,12,13],
                                    next: true,
                                    speed: 0.3
                                },
                                attack : {
                                    frames: [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
                                    next: false,
                                    speed: 0.8
                                },
                                stagger : {
                                    frames: [50,51,52,51,50],
                                    next: false,
                                    speed:0.8
                                },
                                death : {
                                    frames: [50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,69,69,69,69,69],
                                    next: false,
                                    speed: 0.3
                                }
                            }
                        },
                        mobDeathSound : "batDeathSound"
                    },
                    
                    {
                        mobId : 3,
                        mobName : "Paladin Nordstrom 1000",
                        mobHeath : 100,
                        mobSizeMultiplier : 2,
                        mobSpriteSheet : {
                            ssNames : ["PaladinNordstromAttackNW", 
                                      "PaladinNordstromAttackSE", 
                                      "PaladinNordstromDeath"],
                            frameWidth : 1000,
                            frameHeight : 1000, 
                            animations: {
                                idle  : {
                                    frames: [0,1,2],
                                    next: true,
                                    speed: 1,
                                    actionType: 'idle'
                                },
                                attackNW : {
                                    frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
                                    next: false,
                                    speed: 2,
                                    actionType: 'attack'
                                },
                                attackSE : {
                                    frames: [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],
                                    next: false,
                                    speed: 2,
                                    actionType: 'attack'
                                },
                                stagger : {
                                    frames: [0,1,2],
                                    next: false,
                                    speed:3,
                                    actionType: 'stagger'
                                },
                                death : {
                                    frames: [40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65],
                                    next: false,
                                    speed: 1,
                                    actionType: 'death'
                                }
                            }
                        },
                        mobDeathSound : "batDeathSound"
                    }
                ]
            
            };

            let sourceCave = {
                zoneId : 0,
                zoneCode : "sourceCave",
                defaultEventCode : "town",
                zoneBackgroundName : "blueBackground",
                zoneBackgroundImg  : "blueBack.jpg",
                zoneSoundName      : "countryside"
            };

            console.log("generating data for zone: "+zoneCode);
            console.log("*"+zoneCode+"*");
            if(zoneCode.trim() === "sourceCave"){
                console.log(zoneCode);
                return sourceCave;
            }else{
                return testCombatArea;
            }
            
        }
    
    }