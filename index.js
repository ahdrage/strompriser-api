const app = require('express')(); 
const fetch = require('node-fetch');
const PORT = 8080; 





app.listen(process.env.PORT || PORT, ()=> console.log("its running on port " + PORT))


const keyPowerApi = process.env.KEY

const powerPriceUrl = `https://playground-norway-power.ffail.win/?zone=NO1&date=2022-10-20&key=${keyPowerApi}`



fetch(powerPriceUrl)
    .then(response => response.json())
    .then(data => {
        const firstLine = data
        

        app.get('/powerprice', (req, res) => {
            res.status(200).send({
                firstLine
            })
        })

    })


