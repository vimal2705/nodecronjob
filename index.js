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

    notification: {
      title: "Test Notification",
      body: "Here is the Notification Description",
    },
    data: {
        "score": "5x1",
        "time": "10:15"
    },
    android: {
      notification: {
        image:
          "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
      },
      ttl: 36000 * 10000,
      priority: "high",
    },
    
  };
//   const alldata =   admin.firestore().getAll

admin.messaging()
    .sendToDevice("fb3yI1CBR1umrt0TqJcUuV:APA91bHc5ZLAR3kmzC8kAD2PJrDD5bZvmfZYrxxT1WD_ZqnQnTFASLAIDAYyxxZSXJu1IGzJXb2NzUSeqoD7OOjIL7-1brSTtFoPRcivknjSCYd_o0bMAWHNN5pzJQbTTd9PmYA2nJ7C", message)
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
