// import express from 'express'
// import bodyParser from 'body-parser'
// import { admin } from './firebase-config'

// const cors = require('cors');
// const app = express();
// const cron = require('node-cron');
// const moment = require('moment');


// app.use('*', cors());
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send("API is up and running.")
// })

// app.listen(8080, () => {
//     console.log('API is up and running');
// })

// cron.schedule('*/10 * * * * *', () => {
//     //
//     console.log('running a task every second', moment().format('DD MMM YYYY hh:mm:ss A'));
// }, {
//     scheduled: true,
//     timezone: "Asia/Kolkata"
// });

// // var valid = cron.validate('*/10 * * * * *');
// // console.log(valid);

// // # ┌────────────── second (optional)
// // # │ ┌──────────── minute
// // # │ │ ┌────────── hour
// // # │ │ │ ┌──────── day of month
// // # │ │ │ │ ┌────── month
// // # │ │ │ │ │ ┌──── day of week
// // # │ │ │ │ │ │
// // # │ │ │ │ │ │
// // # * * * * * *

// // cron.schedule('* * * * * *', () => {
// //     console.log('running a task every second', moment().format('DD MMM YYYY hh:mm:ss A'));
// // });

// // cron.schedule('*/10 * * * * *', () => {
// //     console.log('running a task every 10 second', moment().format('DD MMM YYYY hh:mm:ss A'));
// // });

// // cron.schedule('10-30 * * * * *', () => {
// //     console.log('running a task between 10-30 second', moment().format('DD MMM YYYY hh:mm:ss A'));
// // });

// // cron.schedule('0,10,20,30,40,50 * * * * *', () => {
// //     console.log('running a task 0,10,20,30,40,50 second', moment().format('DD MMM YYYY hh:mm:ss A'));
// // });

// // ----------------------------------------------------------------------------------------------------

// // cron.schedule('* * * * *', () => {
// //     console.log('running a task every minute', moment().format('DD MMM YYYY hh:mm:ss A'));
// // });

// // // Using multiples values
// // cron.schedule('1,2,4,5 * * * *', () => {
// //     console.log('running every minute 1, 2, 4 and 5');
// // });

// // // Using ranges
// // cron.schedule('1-5 * * * *', () => {
// //     console.log('running every minute to 1 from 5');
// // });

// // // Using step values
// // cron.schedule('1-10/2 * * * *', () => {
// //     console.log('running a task every two minutes.');
// // });

// // cron.schedule('*/2 * * * *', () => {
// //     console.log('running a task every two minutes');
// // });

// // // Using names
// // cron.schedule('* * * January,September Sunday', () => {
// //     console.log('running on Sundays of January and September');
// // });

// // cron.schedule('* * * Jan,Sep Sun', () => {
// //     console.log('running on Sundays of January and September');
// // });

// // // timezone
// // cron.schedule('0 1 * * *', () => {
// //     console.log('Running a job at 01:00 at America/Sao_Paulo timezone');
// // }, {
// //     scheduled: true,
// //     timezone: "America/Sao_Paulo"
// // });

// // // scheduled

// // const task = cron.schedule('0 1 * * *', () => {
// //     console.log('Running a job at 01:00 at America/Sao_Paulo timezone');
// // }, {
// //     scheduled: false,
// //     timezone: "America/Sao_Paulo"
// // });

// // task.start();
// // task.stop();

// // // validate
// // var valid = cron.validate('59 * * * *');
// // console.log(valid);
// // var invalid = cron.validate('60 * * * *');
// // console.log(invalid);
// import express from 'express'
// import bodyparser from 'body-parser'

const admin = require("./firebase")
const express = require('express')
const bodyparser = require("body-parser")

const app = express()
app.use(bodyparser.json())

const port = 3000
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
app.post('/firebase/notification', (req, res)=>{
    const  registrationToken = "e1421997-0507-461b-ba95-88ba496a8154"
    const message = "hello"
    const options =  notification_options
    
      admin.messaging().sendToDevice(registrationToken, message, options)
      .then( response => {

       res.status(200).send("Notification sent successfully")
       
      })
      .catch( error => {
          console.log(error);
      });

})
app.listen(port, () =>{
console.log("listening to port"+port)
})