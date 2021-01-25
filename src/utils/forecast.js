
const request = require('postman-request');

// const forecast = (lat,long, callback)=>{

// }
// forecast (-1, 75 , (error, data) => {

// })

//customize async function
const forecast = ({latitude,longitude}, callback) =>{ 
    const url = 'http://api.weatherstack.com/current?access_key=80fb2012a96191e8c8d0c695fd863132&query='+latitude+','+longitude+'&units=m'
    
    request({url, json: true}, (error, response) =>{   
        if(error){
            callback('unable to connect to weather API!', undefined)
        }else if(response.body.error){
             callback('unable to find location weather!', undefined) 
        }else{   
            //console.log (response.body)   
             callback(undefined, {
                            currentTemp :response.body.current.temperature ,
                            feelsLike: response.body.current.feelslike,
                            wetherDes: response.body.current.weather_descriptions[0],
                            humidity : response.body.current.humidity }
                )
       }        
    })
    
}



module.exports = forecast

/*const url = 'http://api.weatherstack.com/current?access_key=80fb2012a96191e8c8d0c695fd863132&query=37.8267,-122.4233&units=m'
// original code
request({url:url, json: true}, (error, response) =>{   
   //const data = JSON.parse(response.body) //console.log(data.current) 
   if(error){
       console.log('unable to connect :' + error.errno)
   } else if(response.body.error){
       console.log('unable to find location :' + response.body.error.code)
   } else{    
       console.log(response.body.current.weather_descriptions[0] + '.  current temp :'+ response.body.current.temperature+ ' feels like : ' + response.body.current.feelslike)
   }
})
*/





// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

