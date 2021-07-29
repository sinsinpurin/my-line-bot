const line = require('@line/bot-sdk');
const express = require("express")
const app = express()

//CHANNEL_SECRET channel secret
//CHANNEL_TOKEN アクセストークン

const config = {
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_TOKEN
};

const client = new line.Client(config);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

app.post('/callback', line.middleware(config), (req, res) => {
    Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.resolve(null);
    }
  
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: event.message.text
    });
  }
  