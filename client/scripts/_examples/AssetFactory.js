export default () => {

    const BASE_URL = "http://localhost:5000/services/";


    var getAssetListByZone = async function (zoneCode){ 

        const response = await fetch(BASE_URL+'assets/zone:'+zoneCode, {
            method: 'get'
        });

        const assetData = await response.json();

        return assetData;

    } 

    return {
        getAssetListByZone : getAssetListByZone
    }
}

