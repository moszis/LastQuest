import RequestService from '../RequestService'

const BASE_URL = "http://localhost:5000/services/assets/"
const API_KEY = "?api-key=GET-YOUR-FREE-API-KEY:)"

class AssetServices {


  getAssetListByZone(zoneCode){
    //var url = `${BASE_URL}/search/v2/articlesearch.json${API_KEY}`
    var url = BASE_URL+"zone:"+zoneCode;
    return RequestService.getRequest(url)
  }

  getTopStories(){
    var url = `${BASE_URL}/topstories/v2/technology.json${API_KEY}`
    return RequestService.getRequest(url)
  }

}

export default new AssetServices();