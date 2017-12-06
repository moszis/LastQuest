const BASE_URL = "http://localhost:5000/services/";

//TODO: get service URLs from settings file
export async function getAssetListByZone(zoneCode){ 

    const response = await fetch(BASE_URL+'assets/zone:'+zoneCode, {
        method: 'get'
    });

    const assetData = await response.json();

    return assetData;

} 

