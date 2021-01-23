const request = require('postman-request');

//customize async function
// const geocodeEx = (address, callback) =>{    
     
// }
// geocodeEx ('montreal', (error, data) => {

// })

const geocode = (address, callback) =>{    
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmV2aW5lIiwiYSI6ImNrazZ5ZHFjdTA4bXUydm80czFzaDllZGYifQ.t2WWL9loXmAdiCxK8KXn6w&limit=1'
      request({url, json: true}, (error, response) =>{
          if(error){
              callback('unable to find location service!', undefined)
          }else if(response.body.features.length === 0){
               callback('unable to find location! Try another search', undefined) 
          }else{
           const place = response.body.features[0].place_name 
           const longitude = response.body.features[0].center[0];
           const lat = response.body.features[0].center[1];
           const data = {
                        latitude: lat,
                        longitude,
                        place 
                    }
            callback(undefined,data)
          }

      } )  
}
module.exports = geocode

//Original
 // Geocoding API  take address -> Long/Lat 
 //fire off new request to the URL
 
// const urlGeoCode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/montreal.json?access_token=pk.eyJ1IjoibmV2aW5lIiwiYSI6ImNrazZ5ZHFjdTA4bXUydm80czFzaDllZGYifQ.t2WWL9loXmAdiCxK8KXn6w&limit=1'
// 
// request({url: urlGeoCode, json:true},(error, response) =>{
//     if(error){
//         console.log('unable to connect :' + error.errno)
//     } else if(response.body.features.length === 0){
//         console.log('unable to find location :' + response.body.query)
//     } else{
//         console.log(response.body.features[0].place_name) ; 
//         console.log( "  "+response.body.features[0].center[0]) ;  
//     }   
// })