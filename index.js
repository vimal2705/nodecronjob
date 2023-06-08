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


const express = require('express')
const admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');
const bodyparser = require("body-parser")
const serviceAccount = require("./serviceAccountKey.json")
const cors = require('cors');

const cron = require('node-cron');
const sound1 = "./notification.wav"
const moment = require('moment');
const { async } = require('@firebase/util');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://invi-6791b-default-rtdb.firebaseio.com"
  });
const app = express()
const fs = getFirestore()

app.use(bodyparser.json())
const currentdate = new Date().toDateString()
const port = 3000

 
  const devicetoken =  async (ids,title,body) =>{
    var arr = []
    {
    for (let i = 0; i < ids.length; i++) {
    
   
         var message = {
                    "topic":ids[i],
                    "notification": {
                      title: title,
                      body: body,
                      
                    },
                    "android": {
                        "notification": {
                            sound: "notification.wav",
                           
                        }
                    },
                  
                   
                }
                admin.messaging().send(message)

                   .then((response) => {
                    console.log(`Successfully sent message: ${response}`);
                   })
                   .catch((error) => {
                       console.log(`Error sending message: ${error}`);
                   });
               
     
          
         
        }

        
    }
   
  }

  app.post('/sendnotification',  (req, res) => {
    const book = req.body;

    // Output the book to the console for debugging
    console.log(book);
    for (let i = 0; i < book.ids.length; i++) {
    
   
        var message = {
                   "topic": book.ids[i],
                   "notification": {
                     title:  book.title,
                     body:  book.body,
                     
                   },
                   "android": {
                       "notification": {
                           sound: "notification.wav",
                          
                       }
                   },
                 
                  
               }
               admin.messaging().send(message)

                  .then((response) => {
                   console.log(`Successfully sent message: ${response}`);
                  })
                  .catch((error) => {
                      console.log(`Error sending message: ${error}`);
                  });
              
        
       }


    res.send('notification sends');
});

  const fundata = async ()=>{

    // for (let i = 0; i < deviceIds.length; i++) {
    //    
        
    // }
   
    const data = fs.collection("Notifications")
    // const doc = await data.get();
    const snapshot = await data.get();
    snapshot.forEach(doc => {
        var date = new Date(doc.data().date).toDateString()
        console.log("sdsd", 
        date == currentdate,doc.data()
     ); 
     if (  date == currentdate) {
        
      const alldataa = doc.data().ids
    devicetoken(alldataa,doc.data().title,doc.data().body)

     }
    
     
     
     
      
    });
  }

app.use('*', cors());
app.use(bodyparser.json());
cron.schedule('*/30 * *  * *', () => {

    fundata()
    console.log('running a task every second', moment().format('DD MMM YYYY hh:mm:ss A'));
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});


// app.get('/getdata' ,(res)=>{
//     fundata()
// })

app.listen(port, () =>{
console.log("listening to port"+port)
})