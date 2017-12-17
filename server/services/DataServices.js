export default class DataServices{
    
    
        getZone(zoneCode){
            console.log("generating data for zone: "+zoneCode);
            return {
                zoneId : 1,
                zoneCode : "testCombatArea",
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
                            ssName : "batSS",
                            ssFile : "batSS.png",
                            frameWidth : 198,
                            frameHeight : 120, 
                            animations: {
                                idle  : {
                                    frames: [0,1,2,3,4],
                                    next: true,
                                    speed: 1
                                },
                                attack : {
                                    frames: [],
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
                        mobName : "Paladin Nordstrom",
                        mobHeath : 100,
                        mobSizeMultiplier : 2,
                        mobSpriteSheet : {
                            ssName : "paladin",
                            ssFile : "Paladin.png",
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
                        mobName : "Paladin 1000",
                        mobHeath : 100,
                        mobSizeMultiplier : 1,
                        mobAnimations: {
                            idle  : {
                                ssName:"PaladinNordstromIdle",
                                ssFile : "PaladinNordstromAttackNW.png",
                                frameWidth : 1000,
                                frameHeight : 1000, 
                                frames: [0,1,2],
                                next: true,
                                speed: 1
                            },
                            attackNW : {
                                ssName:"PaladinNordstromAttackNW",
                                ssFile : "PaladinNordstromAttackNW.png",
                                frameWidth : 1000,
                                frameHeight : 1000, 
                                frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
                                next: false,
                                speed: 1
                            },
                            attackSE : {
                                ssName:"PaladinNordstromAttackSE",
                                ssFile : "PaladinNordstromAttackSE.png",
                                frameWidth : 1000,
                                frameHeight : 1000, 
                                frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
                                next: false,
                                speed: 1
                            },
                            stagger : {
                                ssName:"PaladinNordstromDeath",
                                ssFile : "PaladinNordstromDeath.png",
                                frameWidth : 1000,
                                frameHeight : 1000, 
                                frames: [0,1,2,1,0],
                                next: false,
                                speed:1
                            },
                            death : {
                                ssName:"PaladinNordstromDeath",
                                ssFile : "PaladinNordstromDeath.png",
                                frameWidth : 1000,
                                frameHeight : 1000, 
                                frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
                                next: false,
                                speed: 1
                            }
                        },
                        mobDeathSound : "batDeathSound"
                    },
            
                    {
                        mobId : 4,
                        mobName : "Ogre",
                        mobHeath : 100,
                        mobSizeMultiplier : 2,
                        mobSpriteSheet : {
                            ssName : "Ogre",
                            ssFile : "ogre.png",
                            frameWidth : 1186,
                            frameHeight : 949, 
                            animations: {
                                idle  : {
                                    frames: [0,1,2,3,4,5,6,7,8,9],
                                    next: true,
                                    speed: 1
                                },
                                attack : {
                                    frames: [10,11,12,13,14,15,16,17,18,19],
                                    next: false,
                                    speed: 2
                                },
                                stagger : {
                                    frames: [0,1],
                                    next: false,
                                    speed:1
                                },
                                death : {
                                    frames: [30,31,32,33,34,35,36,37,38,39],
                                    next: false,
                                    speed: 1
                                }
                            }
                        },
                        mobDeathSound : "batDeathSound"
                    }
                ]
            
            };
        }
    
    }