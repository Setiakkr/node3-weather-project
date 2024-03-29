const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000
// define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
       res.render('index',{
           title: 'Weather App',
           name: 'Sahil Setia'
       })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Sahil Setia'
    })
})
app.get('/help', (req,res)=>{
    res.render('help',{
        helpText: 'This is some helped text.',
        title: 'Help',
        name: 'Sahil setia'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude, (error,forecastData)=> {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a select one'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Sahil Setia',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res) => {
     res.render('404',{
         title: '404',
         name: 'Sahil Setia',
         errorMessage: 'Page not found!'
     })
})

app.listen(port, () => {
    console.log('server is up on port 3000' + port)
})