/***************************
 * utility.js : List of helper functions
 ***************************/
/* Refs :
 * https://github.com/auth0/jwt-decode/issues/53
 * https://siddharthac6.medium.com/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
 * https://gist.github.com/soulmachine/b368ce7292ddd7f91c15accccc02b8df
 *
 */

let jwt = require("jsonwebtoken");
let config = require("./auth.config.js");

// Create a token from a payload
function createToken(payload, tokenLife) {
  return jwt.sign(payload, config.secret, { expiresIn: tokenLife });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, config.secret, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the token is expired or not.
// returns true if the token is expired or false if not expired.
function isTokenExpired(token) {
  let decoded = verifyToken(token);
  let expiresAtSE = decoded.exp; // SE : SinceEpoch
  let CurrentDateSE = new Date().getTime(); // returns the number of milliseconds for this date since the epoch, which is defined as January 1, 1970 00:00:00
  //--------------
  /*
  console.log("Token expires at :", expiresAtSE);
  console.log( "Token expires at (real date) : ", new Date(expiresAtSE * 1000).toLocaleString() ); // (the *1000 part is here because in JS main time unit is millisecond)
  console.log("Current Date : ", CurrentDateSE);
  console.log( "Current Date (real date) : ", new Date(CurrentDateSE).toLocaleString() ); // toLocaleTimeString()
  */
  //--------------
  // Alt-1: expiresAt * 1000 <= Date.now()
  // Alt-2: expiresAt < Date.now() / 1000
  let expired =
    expiresAtSE === undefined
      ? true
	  : expiresAtSE * 1000 <= CurrentDateSE
        ? true
        : false ;
		
  // console.log("expired comparison value : ", expired);
  // expired ? console.log("token expired") : console.log("token is still alive");
  return expired;
}

// Number of milliseconds per day = 24 hrs/day * 60 minutes/hour * 60 seconds/minute * 1000 ms/second
/*
 * const msSinceEpoch = (new Date()).getTime();
 * const seventeenHoursLater = new Date(msSinceEpoch + 17 * 60 * 60 * 1000);
 */

module.exports = { createToken, verifyToken, isTokenExpired };
