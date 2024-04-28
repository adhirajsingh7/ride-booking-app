const Redis = require("redis");
const redisClient = Redis.createClient();

redisClient.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  console.log("Redis connected");
  await redisClient.connect();
})();

module.exports = redisClient;