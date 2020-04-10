const axios = require('axios')

exports.fetch = async url => {
  let results = await axios.get(url)
  .then(res => {
    console.log(res.data.results[0])
    return res.data.results[0].previewUrl
  })
  .catch(err => {console.log("error", err)})
  return results
}