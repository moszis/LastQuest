export default class EventManager {
    
    constructor(enforcer) {
        throw new Error('Event Manager is a Singleton Utility Class; May not create new Instance');
    }


    static subscribe(event, callback){

        console.log("SUBSCRIBING to EVENT: "+event);

        if(!global.subscriptions){
            global.subscriptions = [];
            global.lastUid = 0;
        }

        if (!global.subscriptions.hasOwnProperty(event)){
            global.subscriptions[event] = [];
        }

        let token = (++global.lastUid).toString();

        global.subscriptions[event].push( callback );

        console.log("TOKEN: "+token);

        return token;

    }

    static unsubscribe(token){

        for ( let event in global.subscriptions ){

            if ( global.subscriptions.hasOwnProperty( event ) ){

                for ( var i = 0, j = global.subscriptions[event].length; i < j; i++ ){

                    if ( global.subscriptions[event][i].token === token ){

                        global.subscriptions[event].splice( i, 1 );

                        return true;

                    }

                }

            }

        }

        return false;
    }


    static publish(event, data){
        
        console.log("*** event: "+event+" with data: "+data);

        if ( !global.subscriptions.hasOwnProperty( event ) ){
            console.log("no such event subscriptions: "+event);
            return;
        }

        global.subscriptions[event].forEach( (eventSub) => {
            eventSub(data);
        })
    }
  

}