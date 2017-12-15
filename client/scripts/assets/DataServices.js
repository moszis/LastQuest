const BASE_URL = "http://localhost:5000/services/";

//TODO: get service URLs from settings file
export async function getZone(zoneCode){ 

    const response = await fetch(BASE_URL+'zone/zone:'+zoneCode, {
        method: 'get'
    });

    const assetData = await response.json();

    return assetData;

} 