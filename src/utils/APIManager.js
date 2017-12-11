import superagent from 'superagent';

export default {

  get: (url, params, callback)=> {

    superagent
    .get(url)
    .query(params)
    .set('Accept', 'application/json')
    .end((err,response) => {
      if (err){
        callback(err, null) //there is no response
        return
      }

      const confirmation = response.body.confirmation; //grab confirmation from request failures
      if (confirmation != 'success') {
        callback({message: response.body.message}, null)
        return
      }

      callback(null, response.body) //superagent gives you response in body object
    })
  },
  post: (url, body, callback) => {

    superagent
    .post(url)
    .send(body)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) {
        callback(err, null)
        return
      }

      const confirmation = response.body.confirmation;
      if (confirmation != 'success'){
        callback({message: response.body.message}, null)
        return
      }

      callback( null, response.body)
    })

  },
  put: () => {
    superagent

  },
  delete: () => {

  }
}
