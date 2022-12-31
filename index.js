const app = require("express")();
const fetch = require("node-fetch");
const PORT = 8080;
const schedule = require("node-schedule");
require("dotenv").config();
const mongoose = require("mongoose");

app.listen(process.env.PORT || PORT, () =>
  console.log("its running on port " + PORT)
);

const keyPowerApi = process.env.KEY;
const userNameMongoose = process.env.USERNAME;
const passwordMongoose = process.env.PASSWORD;

mongoose.connect(
  `mongodb+srv://${userNameMongoose}:${passwordMongoose}@cluster0.lavxzg2.mongodb.net/?retryWrites=true&w=majority`,
  () => {
    console.log("connected");
  },
  (e) => console.error(e)
);

const d = new Date();

const currentHour = d.getHours();
const dd = d.getDate();
const mm = d.getMonth() + 1;
const yy = d.getFullYear();

todaysDate = yy + "-" + mm + "-" + dd;

const todayInMilliSeconds = new Date().getTime();
const milliSecondsInOneDay = 24 * 60 * 60 * 1000;
const tomorrowInMilliseconds = todayInMilliSeconds + milliSecondsInOneDay;
const tomorrow = new Date(tomorrowInMilliseconds);
const tomorrowDayOnly = tomorrow.getDate();
const tomorrowMonthOnly = tomorrow.getMonth() + 1;
const tomorrowYearOnly = tomorrow.getFullYear();
const tomorrowsDate =
  tomorrowYearOnly + "-" + tomorrowMonthOnly + "-" + tomorrowDayOnly;

console.log(todaysDate);
console.log(tomorrowsDate);

const Month = require("./Month");

// today
const powerPriceUrlTodayZone1 =
  "https://strompriser-base-api-production.up.railway.app/powerprice-zone1";
const powerPriceUrlTodayZone2 =
  "https://strompriser-base-api-production.up.railway.app/powerprice-zone2";
const powerPriceUrlTodayZone3 =
  "https://strompriser-base-api-production.up.railway.app/powerprice-zone3";
const powerPriceUrlTodayZone4 =
  "https://strompriser-base-api-production.up.railway.app/powerprice-zone4";
const powerPriceUrlTodayZone5 =
  "https://strompriser-base-api-production.up.railway.app/powerprice-zone5";

// tomorrow
const powerPriceUrlTomorrowZone1 =
  "https://strompriser-base-api-production.up.railway.app/powerprice-zone1-tomorrow";
const powerPriceUrlTomorrowZone2 =
  "https://strompriser-base-api-production.up.railway.app/powerprice-zone2-tomorrow";
const powerPriceUrlTomorrowZone3 =
  "https://strompriser-base-api-production.up.railway.app/powerprice-zone3-tomorrow";
const powerPriceUrlTomorrowZone4 =
  "https://strompriser-base-api-production.up.railway.app/powerprice-zone4-tomorrow";
const powerPriceUrlTomorrowZone5 =
  "https://strompriser-base-api-production.up.railway.app/powerprice-zone5-tomorrow";

let powerPriceTodayZone1 = null;
let powerPriceTodayZone2 = null;
let powerPriceTodayZone3 = null;
let powerPriceTodayZone4 = null;
let powerPriceTodayZone5 = null;

let powerPriceTomorrowZone1 = null;
let powerPriceTomorrowZone2 = null;
let powerPriceTomorrowZone3 = null;
let powerPriceTomorrowZone4 = null;
let powerPriceTomorrowZone5 = null;

/* mongoose.connection.on("open", () => {
  // Connection is established, now you can run your code

  Month.updateOne(
    { name: "Dec-region4" },
    {
      $push: {
        prices: [
          1.35445, 1.3675, 3.22744, 2.54684, 1.50646, 1.68241, 1.08024, 0.91594,
          1.05313, 0.61883, 0.64663, 0.71615, 0.74766, 0.81878, 1.71736,
        ],
      },
    }
  )
    .then(() => {
      console.log("Month updated successfully for region 4");
    })
    .catch((error) => {
      console.error(error);
    });
}); */

const job = schedule.scheduleJob("37 13 * * *", () => {
  // ZONE 1

  fetch(powerPriceUrlTomorrowZone1)
    .then((response) => response.json())
    .then((data) => {
      const powerPriceTomorrowZone1 = data.powerPriceTomorrowZone1;

      let dailyPriceArray = [];

      for (let x in powerPriceTomorrowZone1) {
        dailyPriceArray.push(powerPriceTomorrowZone1[x].NOK_per_kWh);
      }

      const sumOfArray = dailyPriceArray.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      );

      const dailyAveragePrice = sumOfArray / dailyPriceArray.length;

      const monthValue = dailyAveragePrice;

      Month.updateOne(
        { name: "Jan-region1" },
        { $push: { prices: monthValue } }
      )
        .then(() => {
          console.log("Month updated successfully for region 1");
        })
        .catch((error) => {
          console.error(error);
        });
    });

  // ZONE 2

  fetch(powerPriceUrlTomorrowZone2)
    .then((response) => response.json())
    .then((data) => {
      const powerPriceTomorrowZone2 = data.powerPriceTomorrowZone2;

      let dailyPriceArray = [];

      for (let x in powerPriceTomorrowZone2) {
        dailyPriceArray.push(powerPriceTomorrowZone2[x].NOK_per_kWh);
      }

      const sumOfArray = dailyPriceArray.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      );

      const dailyAveragePrice = sumOfArray / dailyPriceArray.length;

      const monthValue = dailyAveragePrice;

      Month.updateOne(
        { name: "Jan-region2" },
        { $push: { prices: monthValue } }
      )
        .then(() => {
          console.log("Month updated successfully for region 2");
        })
        .catch((error) => {
          console.error(error);
        });
    });

  // ZONE 3

  fetch(powerPriceUrlTomorrowZone3)
    .then((response) => response.json())
    .then((data) => {
      const powerPriceTomorrowZone3 = data.powerPriceTomorrowZone3;

      let dailyPriceArray = [];

      for (let x in powerPriceTomorrowZone3) {
        dailyPriceArray.push(powerPriceTomorrowZone3[x].NOK_per_kWh);
      }

      const sumOfArray = dailyPriceArray.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      );

      const dailyAveragePrice = sumOfArray / dailyPriceArray.length;

      const monthValue = dailyAveragePrice;

      Month.updateOne(
        { name: "Jan-region3" },
        { $push: { prices: monthValue } }
      )
        .then(() => {
          console.log("Month updated successfully for region 3");
        })
        .catch((error) => {
          console.error(error);
        });
    });

  // ZONE 4

  fetch(powerPriceUrlTomorrowZone4)
    .then((response) => response.json())
    .then((data) => {
      const powerPriceTomorrowZone4 = data.powerPriceTomorrowZone4;

      let dailyPriceArray = [];

      for (let x in powerPriceTomorrowZone4) {
        dailyPriceArray.push(powerPriceTomorrowZone4[x].NOK_per_kWh);
      }

      const sumOfArray = dailyPriceArray.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      );

      const dailyAveragePrice = sumOfArray / dailyPriceArray.length;

      // Replace the monthValue variable with the dailyAveragePrice variable
      const monthValue = dailyAveragePrice;

      Month.updateOne(
        { name: "Jan-region4" },
        { $push: { prices: monthValue } }
      )
        .then(() => {
          console.log("Month updated successfully for region 4");
        })
        .catch((error) => {
          console.error(error);
        });
    });

  // ZONE 5

  fetch(powerPriceUrlTomorrowZone5)
    .then((response) => response.json())
    .then((data) => {
      const powerPriceTomorrowZone5 = data.powerPriceTomorrowZone5;

      let dailyPriceArray = [];

      for (let x in powerPriceTomorrowZone5) {
        dailyPriceArray.push(powerPriceTomorrowZone5[x].NOK_per_kWh);
      }

      const sumOfArray = dailyPriceArray.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      );

      const dailyAveragePrice = sumOfArray / dailyPriceArray.length;

      // Replace the monthValue variable with the dailyAveragePrice variable
      const monthValue = dailyAveragePrice;

      Month.updateOne(
        { name: "Jan-region5" },
        { $push: { prices: monthValue } }
      )
        .then(() => {
          console.log("Month updated successfully for region 5");
        })
        .catch((error) => {
          console.error(error);
        });
    });
});

async function getDocumentRegion1() {
  const result = await Month.findOne({ name: "Jan-region1" }).exec();
  // do something with the result
  return result;
}

async function getDocumentRegion2() {
  const result = await Month.findOne({ name: "Jan-region2" }).exec();
  // do something with the result
  return result;
}

async function getDocumentRegion3() {
  const result = await Month.findOne({ name: "Jan-region3" }).exec();
  // do something with the result
  return result;
}

async function getDocumentRegion4() {
  const result = await Month.findOne({ name: "Jan-region4" }).exec();
  // do something with the result
  return result;
}

async function getDocumentRegion5() {
  const result = await Month.findOne({ name: "Jan-region5" }).exec();
  // do something with the result
  return result;
}

app.get("/powerprice-month-zone1", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // call getDocument and wait for the result
  const document = await getDocumentRegion1();
  // send the result back in the response
  res.status(200).send(document);
});

app.get("/powerprice-month-zone2", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // call getDocument and wait for the result
  const document = await getDocumentRegion2();
  // send the result back in the response
  res.status(200).send(document);
});

app.get("/powerprice-month-zone3", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // call getDocument and wait for the result
  const document = await getDocumentRegion3();
  // send the result back in the response
  res.status(200).send(document);
});

app.get("/powerprice-month-zone4", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // call getDocument and wait for the result
  const document = await getDocumentRegion4();
  // send the result back in the response
  res.status(200).send(document);
});

app.get("/powerprice-month-zone5", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // call getDocument and wait for the result
  const document = await getDocumentRegion5();
  // send the result back in the response
  res.status(200).send(document);
});
