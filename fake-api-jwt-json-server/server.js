/* The Status-Code and Description
 * 2xx: Success (It means the action was successfully received, understood, and accepted.)
 * ---------- 200 OK
 * ---------- 201 Created
 * ---------- 204 No Content (A status code and a header are given in the response, but there is no entity-body in the reply.)
 *
 * 3xx: Redirection (It means further action must be taken in order to complete the request.)
 *
 * 4xx: Client Error (It means the request contains incorrect syntax or cannot be fulfilled.)
 * ---------- 400 Bad Request
 * ---------- 401 Unauthorized
 * ---------- 403 Forbidden
 * ---------- 404 Not Found
 *
 * 5xx: Server Error (It means the server failed to fulfill an apparently valid request.)
 * ---------- 500 Internal Server Error
 */
const log4js = require("log4js");
log4js.configure({
  appenders: {
    app: { type: "file", filename: "fake-api-jwt-json-server.log" },
  },
  categories: {
    default: { appenders: ["app"], level: "debug" },
  },
});

const logger = log4js.getLogger("app");

/*
logger.trace("Hello");
logger.debug("Hello");
logger.info("Hello");
logger.warn("Hello");
logger.error("Hello");
logger.fatal("Hello");
*/

let jsonServer = require("json-server");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
var cors = require("cors");
let config = require("./auth.config.js");
let { createToken, verifyToken, isTokenExpired } = require("./utility.js");
let { v4: uuidv4 } = require("uuid");

let server = jsonServer.create();
let router = jsonServer.router("db.json");
let middlewares = jsonServer.defaults();
// configure our json Server instance with some body-parser settings
// including handling JSON data
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
let corsOptions = {
  origin: "http://localhost:3000", // For SPA, it is your front-end adress
  credentials: true, //access-control-allow-credentials:true
};
server.use(cors(corsOptions));
server.use(cookieParser(config.secret)); // <-- 'MY SECRET'
server.use(jsonServer.defaults());

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
/*
How to fetch images from Json server ?
Solution: use express framework
*/
// Requiring module
let express = require("express");
// Function to serve all static files(images in our case)
// inside public images directory.
server.use("/images", express.static("images"));

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
/*
This method verifies the token sent from the client using the public key and returns the decoded value of the token. Note that if the decoded value is not returned, it means the token initially signed is invalid. Lastly, we append the decoded value to the response object.
*/

const authenticateToken = (req, res, next) => {
  logger.info("authenticateToken called;");
  // get the token from the authorization header
  let token =
    req.headers["x-access-token"] ||
    req.headers.authorization ||
    req.body.token ||
    req.query.token;

  logger.info("token : ", token);

  if (!token) {
    return res
      .status(401)
      .send({ message: "Access Denied : No token provided!" });
  }
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
    if (!token || token === "" || token === "undefined")
      return res
        .status(401)
        .send({ message: "Access Denied : No token provided!" });
  }

  // check if the token matches the supposed origin: call the verifyToken method to verify the token is valid ( to verify secret and check exp)
  const decoded = verifyToken(token);
  if (!decoded) return res.status(403).send({ message: "invalid signature" });

  if (isTokenExpired(token)) {
    return res.status(401).send({
      message: "access token was expired.",
    });
  }

  logger.info("****** authenticateToken ******* token :", decoded);
  // retrieve the user details of the logged in user
  const user = decoded;
  if (decoded) res.user = user; // pass the user down to the endpoints here
  res.token = token;
  // pass down functionality to the endpoint
  next();
};
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//---------------------------------------------------------------------------

/*
// Check if the user exists in database
function isAuthenticated({email, password}){
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
} 
*/

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

// Common middleware
server.use((req, res, next) => {
  logger.info("common middleware called.");
  const reqData = req.body;
  logger.info("Request Data : ", reqData);
  let refreshToken = req.cookies["jwt-refreshToken"];
  if (refreshToken) {
    let decoded = verifyToken(refreshToken);
    logger.info("Request Cookies(jwt-refreshToken) : ", refreshToken);
    logger.info("decoded jwt-refreshToken : ", decoded);
  }

  // pass down functionality to the endpoint
  next(); //if error | next will be skiped
});

//-------------------------------------------------------------------------------------------
// This aims to solve 304 status problem by disabling caching for some routes in the server.
const dontCache = (req, res, next) => {
  res.setHeader("Surrogate-Control", "no-store");
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
  );
  next();
};
//-------------------------------------------------------------------------------------------

/*******************
 *  Access control
 *******************/

/*
/posts       <------------------
/users       <------------------ 
/companies   <------------------ 
/employees   <------------------
*/

// Protect the Endpoint
server.use("/posts", authenticateToken, dontCache, (req, res, next) => {
  const postData = req.body;
  console.log("from posts Endpoint : ", postData);

  next(); //if error | next will be skiped
});

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

// Login to one of the users
server.post("/login", (req, res) => {
  logger.info("login endpoint called.");

  const { username, password } = req.body;
  logger.info(req.body);

  if (!username || !password) {
    res.sendStatus(400);
    return;
  }

  // do the database authentication here, with user name and password combination.
  const users = router.db.getState().users;
  const user = users.find((user) => user.username === username);
  if (user) {
    let tokenPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    // create JWT access token
    const token = createToken(tokenPayload, config.jwtExpiration);
    logger.info("accessToken : ", token);
    //---------------------------------------------------------
    //---------------------------------------------------------
    //---------------------------------------------------------
    // create JWT refresh token
    const nextId = router.db.get("refreshTokenList").value().length;
    logger.info("*********** nextId ***********", nextId);
    let value = uuidv4();
    let refreshTokenPayload = {
      id: nextId,
      value: value,
      userId: user.id,
    };
    let refreshToken = createToken(
      refreshTokenPayload,
      config.jwtRefreshExpiration
    );
    logger.info("refreshToken : ", refreshToken);

    const response = {
      token: token,
      refreshToken: refreshToken,
    };
    //---------------------------------------------------------
    // Saving refresh token in database so server can invalidate it anytime
    // In this example nodemon restart cause clearing it (may be: to be verified)
    const refreshTokens = router.db.getState().refreshTokenList;
    const tokenExist = refreshTokens.find(
      (token) => token.userId === refreshTokenPayload.userId
    );
    if (!tokenExist) {
      router.db.get("refreshTokenList").push(refreshTokenPayload).write();
      logger.info("refreshToken has been saved successfully!");
    } else {
      logger.info("refreshToken already exists!");
    }
    //<------------------------- We don't need it. not useful at all.
    /*
    res.cookie("jwt-refreshToken", refreshToken, { 
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: config.jwtRefreshExpiration,
	  signed: true,
    });
	*/
    //---------------------------------------------------------
    //---------------------------------------------------------
    //---------------------------------------------------------
    res.send(response);
  } else {
    res.sendStatus(404);
  }
});

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

// Add custom routes before JSON Server router
// Register New User
server.post("/register", (req, res) => {
  logger.info("register endpoint called; request body:");
  // const users = db.get('users').value();

  const newUser = ({ email, firstName, lastName, username, password, role } =
    req.body);

  if (!newUser.username || !newUser.password) {
    res.sendStatus(400);
    return;
  }

  // Save User in the database
  const users = router.db.getState().users;

  const userExist = users.find((user) => user.username === newUser.username);
  logger.info("userExist : ", userExist);
  if (!userExist) {
    if (err) {
      logger.error(err.stack);
    }

    router.db.get("users").push(newUser).write();
    res.status(201).send({ message: "User created successfully" });
  } else {
    res.status(403).send({ message: "Duplicated username" });
  }
});

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

// On client, also delete the accessToken
server.post("/logout", (req, res) => {
  logger.info("Logout endpoint called.");
  //<*****************************************
  let refreshToken = req.cookies["jwt-refreshToken"];

  if (!refreshToken) return res.sendStatus(204); //No content
  let decoded = verifyToken(refreshToken);

  // Is refreshToken in db?
  const foundUser = router.db
    .get("refreshTokenList")
    .find(
      (person) =>
        person.value === decoded.value && person.userId === decoded.userId
    );
  if (!foundUser) {
    console.log("refresh token didn't exist in db. we delete only cookie");
    res.clearCookie("jwt-refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.sendStatus(204);
  }
  //-----------------------------------------------
  //-----------------------------------------------
  // Delete refreshToken in db
  router.db.get("refreshTokenList").remove({ userId: decoded.userId }).write();
  console.log("Successful refresh token deletion!");
  //-----------------------------------------------
  //-----------------------------------------------
  res.clearCookie("jwt-refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
});

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

// RefreshToken
// to call when our access token expired
server.post("/refresh", (req, res) => {
  // logger.info("refresh token endpoint has been called.");
  console.log("refresh/ endpoint has been called.");
  //-----------------------------------------------------------
  //-----------------------------------------------------------
  let refreshToken = req.cookies["jwt-refreshToken"];

  if (!refreshToken)
    return res.status(204).send({ message: "No content! - from refresh/" }); // No content

  let decoded = verifyToken(refreshToken);
  // logger.info(decoded);
  // console.log("from refresh/ : ", decoded);

  if (decoded == null) {
    console.log("403 error - Refresh Token is required! - from refresh/");
    return res.status(403).send({ message: "Refresh Token is required!" });
  }
  //-----------------------------------------------
  //-----------------------------------------------
  if (isTokenExpired(refreshToken)) {
    // Delete the refresh token from the db
    router.db.get("refreshTokenList").remove({ value: decoded.value }).write();
    // logger.info("Successful refresh token deletion!");
    console.log("Successful refresh token deletion! - from refresh/");
    console.log(
      "Refresh token was expired. Please make a new signin request - from refresh/"
    );
    return res.status(403).send({
      message: "Refresh token was expired. Please make a new signin request",
    });
  }
  //-----------------------------------------------
  //-----------------------------------------------

  try {
    const tokenExist = router.db
      .get("refreshTokenList")
      .find(
        (person) =>
          person.value === decoded.value && person.userId === decoded.userId
      );

    if (!tokenExist) {
      console.log(
        "404 error - Refresh token is not in database! - from refresh/"
      );
      return res
        .status(403)
        .json({ message: "Refresh token is not in database!" });
    }

    const user = router.db
      .getState()
      .users.find((user) => user.id === decoded.userId);

    if (decoded) {
      // refresh the damn token
      // if refresh token exists
      const newAccessTokenPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      let newAccessToken = createToken(
        newAccessTokenPayload,
        config.jwtRefreshExpiration
      );
      const response = {
        token: newAccessToken,
      };

      // return logic seems ok.
      // Return { new accessToken } if everything is done
      console.log(
        "200 OK - Everything is done. New accessToken has been returned - from refresh/"
      );
      return res.status(200).send(response);
      // Or else, send error message
    } else {
      console.log("404 error - Invalid request - from refresh/");
      return res.status(404).send({ message: "Invalid request" });
    }
  } catch (err) {
    console.log("500 error - from refresh/");
    return res.status(500).send({ message: err });
  }
});

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

// Use default router
server.use(router);

// finally, launch our server on port 8000.
const port = 8000;
server.listen(port, () => {
  console.log("JSON Server is running on port http://localhost:%s 😉✨", port);
  console.log("press Ctrl+C and then type Y to stop the app.");
});
