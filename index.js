const app = require('express')(); 
const fetch = require('node-fetch');
const PORT = 8080; 
require('dotenv').config(); 

app.listen(process.env.PORT || PORT, ()=> console.log("its running on port " + PORT))


const keyPowerApi = process.env.KEY

const d = new Date();

const currentHour = d.getHours()
const dd = d.getDate();
const mm = d.getMonth()+1;
const yy = d.getFullYear(); 

todaysDate = yy+"-"+mm+"-"+dd

console.log(todaysDate);


const powerPriceUrl = `https://playground-norway-power.ffail.win/?zone=NO1&date=${todaysDate}&key=${keyPowerApi}`
// const powerPriceUrl= `https://norway-power.ffail.win?zone=NO1&date=${todaysDate}&key=${keyPowerApi}` 

fetch(powerPriceUrl)
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


