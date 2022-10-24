const app = require('express')(); 
const fetch = require('node-fetch');
const PORT = 8080; 
const Koa = require('koa');
const app = new Koa();



app.listen(process.env.PORT || PORT, ()=> console.log("its running on port " + PORT))

app.use(ctx => {
    ctx.body = 'Hello Koa';
  });


const powerPriceUrl = `https://playground-norway-power.ffail.win/?zone=NO1&date=2022-10-20&key=e17fd22c-487b-408f-8ab2-c3bed05a8da7`



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


