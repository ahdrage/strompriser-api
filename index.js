const app = require('express')();
const fetch = require('node-fetch');
const PORT = 8080;
const schedule = require('node-schedule');
require('dotenv').config();

app.listen(process.env.PORT || PORT, () => console.log("its running on port " + PORT))


const keyPowerApi = process.env.KEY

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
 const powerPriceUrlToday = `https://norway-power.ffail.win?zone=NO1&date=${todaysDate}&key=${keyPowerApi}` 
 const powerPriceUrlTomorrow = `https://norway-power.ffail.win?zone=NO1&date=${tomorrowsDate}&key=${keyPowerApi}` 

// test
// const powerPriceUrlToday = `https://playground-norway-power.ffail.win/?zone=NO1&date=${todaysDate}&key=${keyPowerApi}`
//const powerPriceUrlTomorrow = `https://playground-norway-power.ffail.win/?zone=NO1&date=${tomorrowsDate}&key=${keyPowerApi}`



    fetch(powerPriceUrlToday)
        .then(response => response.json())
        .then(data => {
            const firstLine = data



            app.get('/powerprice', (req, res) => {
                res.set('Access-Control-Allow-Origin', '*');
                res.status(200).send({
                    firstLine
                })
            })

        })

  

    fetch(powerPriceUrlTomorrow)
        .then(response => response.json())
        .then(data => {
            const firstLine = data

            app.get('/powerpriceTomorrow', (req, res) => {
                res.set('Access-Control-Allow-Origin', '*');
                res.status(200).send({
                    firstLine
                })
            })

        })
  
