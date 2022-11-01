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


let person = {
    firstName : "John",
    lastName  : "Doe",
    age     : 50,
    eyeColor  : "blue"
  }


/* async function addDailyPricetoDB() {

    await Month.updateOne(
      { name: "novemberArray" },
      { $push: { monthValues: [powerPriceKW] } }
    )
  }
  addDailyPricetoDB() */


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





 
const job = schedule.scheduleJob('52 05 * * *', function () {
    fetch(powerPriceUrlTodayZone1)
        .then(response => response.json())
        .then(data => {
            const firstLine = data

           console.log(firstLine);



            app.get('/powerprice-today-zone1', (req, res) => {
                res.set('Access-Control-Allow-Origin', '*');
                res.status(200).send({
                    firstLine
                })
            })

        })

    
    })
  
    
    const jobTomorrow = schedule.scheduleJob('02 13 * * *', function () {


    fetch(powerPriceUrlTomorrowZone1)
        .then(response => response.json())
        .then(data => {
            const firstLine = data

            app.get('/powerprice-tomorrow-zone1', (req, res) => {
                res.set('Access-Control-Allow-Origin', '*');
                res.status(200).send({
                    firstLine
                })
            })

        }) 

    })
