module.exports = {
  secret: "123456789",
  // jwtExpiration: '1h',           // 1 hour
  // jwtRefreshExpiration: '24h',   // 24 hours

  /* for test */
  jwtExpiration: '10s', // it will be expired after 10s
  jwtRefreshExpiration: '2m', // 2m
};


/*
expiresIn: '120' // it will be expired after 120ms
"120" is equal to "120ms"
expiresIn: '1s' // 1 sec 
expiresIn: "120s" // it will be expired after 120s
expiresIn: '24h' // expires in 24 hours
expiresIn: '10h' // it will be expired after 10 hours
expiresIn: '20d' // it will be expired after 20 days
expiresIn: '365d' // expires in 365 days
*/