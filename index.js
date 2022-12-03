const app = require('express')();
const fetch = require('node-fetch');
const PORT = 8080;
const schedule = require('node-schedule');
require('dotenv').config();
const mongoose = require("mongoose")

app.listen(process.env.PORT || PORT, () => console.log("its running on port " + PORT))

const keyPowerApi = process.env.KEY
const userNameMongoose = process.env.USERNAME
const passwordMongoose = process.env.PASSWORD

mongoose.connect(
    `mongodb+srv://${userNameMongoose}:${passwordMongoose}@cluster0.lavxzg2.mongodb.net/?retryWrites=true&w=majority`,
    () => {
        console.log("connected");
    },
    e => console.error(e)

)

const d = new Date();

const currentHour = d.getHours()
const dd = d.getDate();
const mm = d.getMonth() + 1;
const yy = d.getFullYear();

todaysDate = yy + "-" + mm + "-" + dd

const todayInMilliSeconds = new Date().getTime()
const milliSecondsInOneDay = 24 * 60 * 60 * 1000
const tomorrowInMilliseconds = todayInMilliSeconds + milliSecondsInOneDay
const tomorrow = new Date(tomorrowInMilliseconds)
const tomorrowDayOnly = tomorrow.getDate()
const tomorrowMonthOnly = tomorrow.getMonth() + 1;
const tomorrowYearOnly = tomorrow.getFullYear();
const tomorrowsDate = tomorrowYearOnly + "-" + tomorrowMonthOnly + "-" + tomorrowDayOnly

console.log(todaysDate);
console.log(tomorrowsDate);



// prod
// const powerPriceUrlToday = `https://norway-power.ffail.win?zone=NO1&date=${todaysDate}&key=${keyPowerApi}` 
// const powerPriceUrlTomorrow = `https://norway-power.ffail.win?zone=NO1&date=${tomorrowsDate}&key=${keyPowerApi}` 


// test
// const powerPriceUrlToday = `https://playground-norway-power.ffail.win/?zone=NO1&date=${todaysDate}&key=${keyPowerApi}`
// const powerPriceUrlTomorrow = `https://playground-norway-power.ffail.win/?zone=NO1&date=${tomorrowsDate}&key=${keyPowerApi}`

// today
const powerPriceUrlTodayZone1 = 'https://strompriser-base-api-production.up.railway.app/powerprice-zone1'
const powerPriceUrlTodayZone2 = 'https://strompriser-base-api-production.up.railway.app/powerprice-zone2'
const powerPriceUrlTodayZone3 = 'https://strompriser-base-api-production.up.railway.app/powerprice-zone3'
const powerPriceUrlTodayZone4 = 'https://strompriser-base-api-production.up.railway.app/powerprice-zone4'
const powerPriceUrlTodayZone5 = 'https://strompriser-base-api-production.up.railway.app/powerprice-zone5'

// tomorrow
const powerPriceUrlTomorrowZone1 = 'https://strompriser-base-api-production.up.railway.app/powerprice-zone1-tomorrow'
const powerPriceUrlTomorrowZone2 = 'https://strompriser-base-api-production.up.railway.app/powerprice-zone2-tomorrow'
const powerPriceUrlTomorrowZone3 = 'https://strompriser-base-api-production.up.railway.app/powerprice-zone3-tomorrow'
const powerPriceUrlTomorrowZone4 = 'https://strompriser-base-api-production.up.railway.app/powerprice-zone4-tomorrow'
const powerPriceUrlTomorrowZone5 = 'https://strompriser-base-api-production.up.railway.app/powerprice-zone5-tomorrow'


let powerPriceTodayZone1 = null
let powerPriceTodayZone2 = null
let powerPriceTodayZone3 = null
let powerPriceTodayZone4 = null
let powerPriceTodayZone5 = null

let powerPriceTomorrowZone1 = null
let powerPriceTomorrowZone2 = null
let powerPriceTomorrowZone3 = null
let powerPriceTomorrowZone4 = null
let powerPriceTomorrowZone5 = null

const jobRevalidateNight = schedule.scheduleJob('55 23 * * *', function () {


    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Signature': 'nYP3EqeyzZiv8dapwt9Zb3sK'
      },
      body: JSON.stringify({
        some: 'data'
      })
    };
    
    fetch('https://www.strompriser.no/api/revalidate', options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })

    })


    const jobRevalidateDay = schedule.scheduleJob('02 13 * * *', function () {


        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Signature': 'nYP3EqeyzZiv8dapwt9Zb3sK'
          },
          body: JSON.stringify({
            some: 'data'
          })
        };
        
        fetch('https://www.strompriser.no/api/revalidate', options)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          })
    
        })






const job = schedule.scheduleJob('54 23 * * *', function () {

    fetch(powerPriceUrlTodayZone1)
        .then(response => response.json())
        .then(data => {
            powerPriceTodayZone1 = data
            console.log(powerPriceTodayZone1);
        })


    fetch(powerPriceUrlTodayZone2)
        .then(response => response.json())
        .then(data => {
            powerPriceTodayZone2 = data
        })


    fetch(powerPriceUrlTodayZone3)
        .then(response => response.json())
        .then(data => {
            powerPriceTodayZone3 = data
        })


    fetch(powerPriceUrlTodayZone4)
        .then(response => response.json())
        .then(data => {
            powerPriceTodayZone4 = data
        })

    fetch(powerPriceUrlTodayZone5)
        .then(response => response.json())
        .then(data => {
            powerPriceTodayZone5 = data
        })

})

app.get('/powerprice-today-zone1', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send({
        powerPriceTodayZone1
    })
})

app.get('/powerprice-today-zone2', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send({
        powerPriceTodayZone2
    })
})

app.get('/powerprice-today-zone3', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send({
        powerPriceTodayZone3
    })
})

app.get('/powerprice-today-zone4', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send({
        powerPriceTodayZone4
    })
})

app.get('/powerprice-today-zone5', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send({
        powerPriceTodayZone5
    })
})

const jobTomorrow = schedule.scheduleJob('02 13 * * *', function () {

    fetch(powerPriceUrlTomorrowZone1)
        .then(response => response.json())
        .then(data => {
            powerPriceTomorrowZone1 = data
            console.log(powerPriceTomorrowZone1);
        })

    fetch(powerPriceUrlTomorrowZone2)
        .then(response => response.json())
        .then(data => {
            powerPriceTomorrowZone2 = data
        })

    fetch(powerPriceUrlTomorrowZone3)
        .then(response => response.json())
        .then(data => {
            powerPriceTomorrowZone3 = data
        })

    fetch(powerPriceUrlTomorrowZone4)
        .then(response => response.json())
        .then(data => {
            powerPriceTomorrowZone4 = data
        })

    fetch(powerPriceUrlTomorrowZone5)
        .then(response => response.json())
        .then(data => {
            powerPriceTomorrowZone5 = data
        })

})

app.get('/powerprice-tomorrow-zone1', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send({
        powerPriceTomorrowZone1
    })
})

app.get('/powerprice-tomorrow-zone2', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send({
        powerPriceTomorrowZone2
    })
})

app.get('/powerprice-tomorrow-zone3', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send({
        powerPriceTomorrowZone3
    })
})


app.get('/powerprice-tomorrow-zone4', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send({
        powerPriceTomorrowZone4
    })
})


app.get('/powerprice-tomorrow-zone5', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send({
        powerPriceTomorrowZone5
    })
})




