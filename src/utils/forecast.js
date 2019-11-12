const request = require('request')
const forecast = (latitude,longitude, callback) => {
     const url = 'https://api.darksky.net/forecast/9806e3c86f501d97100bc58240480998/' + latitude + ',' + longitude

     request({url, json: true}, (error, { body }) => {
         if(error){
               callback('unable to connect to waether service', undefined)
         } else if(body.error) {
             callback('unable to find location',undefined)

         } else {
              callback(undefined, body.daily.data[0].summary + ' It is Currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + ' % chance of rain')
         }
     })
}

module.exports = forecast