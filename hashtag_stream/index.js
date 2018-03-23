const Twit = require('twit');
const { WebClient } = require('@slack/client');

// Setup Twitter
const T = new Twit({
  consumer_key:         'XXX',
  consumer_secret:      'XXX',
  access_token:         'XXX',
  access_token_secret:  'XXX'
});

// Setup slack
const token = 'XXX';
const web = new WebClient(token);

const stream = T.stream('statuses/filter', {
  track: '#himobi'
});
 
stream.on('tweet', (tweet) => {
  const { text, user } = tweet;
  const message = `@${user.screen_name} said "${text}"`;

  // Post message
  web.chat.postMessage({
    channel: 'general',
    text: message,
    as_user: false,
    icon_emoji: ':bird:',
    username: 'Twitter Bot'
  })
    .then((res) => {
      // `res` contains information about the posted message
      console.log('Message sent: ', res.ts);
    })
    .catch(console.error);
});