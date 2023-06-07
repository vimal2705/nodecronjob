const express = require("express");
const admin = require("firebase-admin");
const app = express();
const port = 3000;
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/notify", async (req, res) => {
  const message = {
    "token" : "fb3yI1CBR1umrt0TqJcUuV:APA91bHc5ZLAR3kmzC8kAD2PJrDD5bZvmfZYrxxT1WD_ZqnQnTFASLAIDAYyxxZSXJu1IGzJXb2NzUSeqoD7OOjIL7-1brSTtFoPRcivknjSCYd_o0bMAWHNN5pzJQbTTd9PmYA2nJ7C",
    "notification": {
      title: "Test Notification",
      body: "Here is the Notification Description",
    },
   
    
  };
//   const alldata =   admin.firestore().getAll

admin.messaging()
    .send( message)
    .then((response) => {
      res.send(`Successfully sent message: ${response}`);
    })
    .catch((error) => {
      res.send(`Error sending message: ${error}`);
    });
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
