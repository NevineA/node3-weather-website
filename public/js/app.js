console.log('client side java script is loaded!')



const weatherForm = document.querySelector('form')
const search      = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetch('/weather/?address='+location).then((res) =>{
        res.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error
            }else{
                message1.textContent = "Forecast for location:  "+data.location 
                message2.textContent = "Current temprature :"+ data.forcast.currentTemp + "C . "+
                                      " It feels Like " +data.forcast.feelsLike+ " . It's currently "+ data.forcast.wetherDes +
                                      " . The humidity is : " + data.forcast.humidity+ "%"

               
            }    
        })  
    })
})
// old code for fetch  http://localhost:3000/weather/?address='+location
