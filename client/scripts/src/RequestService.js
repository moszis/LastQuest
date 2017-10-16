class RequestService {
    
    async getRequest(url){
      let data = await (await (fetch(url)
        .then(res => {
          return res.json();
        })
        .catch(err => {
          console.log('Error: ', err);
        })
      ))
      return data;
    }
}
    
export default new RequestService();