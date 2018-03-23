const { WebClient } = require('@slack/client');
const token = 'XXX';
const web = new WebClient(token);

web.chat.postMessage({ channel: 'test', text: 'Hello there' })
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);