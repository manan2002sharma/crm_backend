const redis = require("redis");
const client = redis.createClient({
  url:process.env.REDIS_URL
});

// const client = redis.createClient({
//     password: 'LHI1HPpTqb3SS6vACLJLEewcM4lGnzPc',
//     socket: {
//         host: 'redis-18367.c80.us-east-1-2.ec2.redns.redis-cloud.com',
//         port: 18367
//     }
// });
//const client = redis.createClient(process.env.REDIS_URL);

client.on('connect', () => {
  console.log('Connected to Redis');
  console.log(process.env.REDIS_URL);
});
client.on("error", function (error) {
  console.error(error);
});

const setJWT = (key, value) => {
  return new Promise((resolve, reject) => {
    
    try {
      return client.set(key, value, (err, res) => {
        console.log(key)
        if (err) {
          console.log(err)
          reject(err)
        };
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getJWT = (key) => {
  return new Promise((resolve, reject) => {
    try {
      client.get(key, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteJWT = (key) => {
  try {
    client.del(key);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  setJWT,
  getJWT,
  deleteJWT,
};
