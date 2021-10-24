const got = require('got');

const addresses = [
  'aardvark@the.zoo',
  'crocodile@the.zoo',
  'elephant@the.zoo',
  'emu@the.zoo',
  'hippopotamus@the.zoo',
  'llama@the.zoo',
  'octopus@the.zoo',
  'otter@the.zoo',
  'panda@the.zoo',
  'pangolin@the.zoo',
  'tortoise@the.zoo',
  'walrus@the.zoo'
];

const endpoints = [
  'genres',
  'directors',
  'movies',
  'error'
];

const method = [
  'get',
  'put',
  'post'
];

async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

(async () => {
  while (true) {
      var email = Math.floor(Math.random() * addresses.length);
      var sleeping = Math.floor(Math.random() * 9) + 1;
      let endpoint = Math.floor(Math.random() * endpoints.length);
      try {
        const response = await got.get(`http://localhost:3001/${endpoints[endpoint]}`, {
          headers: {
              from: addresses[email]
          }
        });
        console.log(response.body);
      } catch (error) {
        console.log(error.response.body);
      }

  await sleep(sleeping * 1000);
  }
})();