const Twit = require('twit');

// Setup Twitter
const T = new Twit({
  consumer_key:         'XXX',
  consumer_secret:      'XXX',
  access_token:         'XXX',
  access_token_secret:  'XXX'
});

const getRandomTweet = (cb) => {
  T.get('statuses/user_timeline', { screen_name: 'officialjaden', count: 100 }, function(err, data, response) {
    // Make sure there are enough tweets
    const num = data.length;
    const index = Math.floor((Math.random() * num));
  
    // Find the tweet
    const tweet = data[index];

    // IRL you should probably check for errors
    cb(tweet.text);
  });
};

// The Lambda function
exports.handler = (event, context, callback) => {
  getRandomTweet(text => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ tweet: text })
    });
  });
};