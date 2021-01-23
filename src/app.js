const path = require('path') // core module
const express =require ('express') // npm module
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

//Define paths for Experess config 
const PublicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and view location
//The first three statements give us a way to use HBS for server-side templating. 
app.set('view engine', 'hbs') // set handlebar templets engine with express
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve up the public directory so those assets (HTML, CSS, JavaScript, images) can be accessed by the browser.
app.use(express.static(PublicDirectoryPath))


app.get('',(rep, res)=>{
    res.render('index',{
        title : 'Weather',
        name:'N Mekhael'
    })
})
app.get('/about',(rep, res)=>{
    res.render('about',{
        title : 'About',
        name:'N Mekhael'
    })
})
app.get('/help',(rep, res)=>{ // hbs handler
    res.render('help',{
        message : 'This is some helpful text. ',
        title : 'Help',
        name:'N Mekhael'
    })
})


app.get('/weather',(req, res)=>{
    //console.log('Nevine req.query :',req.query)
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    //My solution
    geocode (req.query.address, (error, {latitude, longitude, place} = {}) => {
        if(error){
            return res.send({ error })
        }          
        forecast ({latitude, longitude} , (error, dataForecast) => {
            if(error){
                return res.send({error })
            }            
            res.send({
                forcast: dataForecast,
                location:place,
                address: req.query.address
            })  
        }) 
    })    
})

// app.get('/products',(req, res)=>{
//     console.log('Nevine req.query :',req.query.search)
//     res.send({
//         products: []    
//     })
// })

app.get('/help/*', (req, res)=>{
    res.render('404', {
        errormes: 'Help articls not found',
        title : '404',
        name:'N Mekhael'
    })

})
app.get('*',(req, res)=>{
    res.render('404', {
        errormes: 'Page not found',
        title : '404',
        name:'N Mekhael'
    })
})    
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


