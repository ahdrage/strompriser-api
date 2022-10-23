const app = require('express')(); 
const fetch = require('node-fetch');
const PORT = 8080; 

app.listen(
    PORT, 
    () => console.log('its alive')
)


const powerPriceUrl = `https://playground-norway-power.ffail.win/?zone=NO1&date=2022-10-20&key=e17fd22c-487b-408f-8ab2-c3bed05a8da7`



fetch(powerPriceUrl)
    .then(response => response.json())
    .then(data => {
        const firstLine = data
        console.log(firstLine);

        app.get('/powerprice', (req, res) => {
            res.status(200).send({
                firstLine
            })
        })

    })


