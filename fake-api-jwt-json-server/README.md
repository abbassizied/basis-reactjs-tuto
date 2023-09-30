# JSONServer + JWT Auth

A Fake REST API using json-server with JWT authentication.  

Implemented End-points: login, register, logout, refresh

 
## Install

``` 
$ npm install 
```

## To launch server
```
$ node server.js
// OR
$ npm start
``` 


## How to login/register?

You can login/register by sending a POST request to

```
POST http://localhost:8000/login
POST http://localhost:8000/register
```
with the following data 

```
{
  "username": "Zizou87",
  "password":"my-super-secret-password"
}
```

You should receive an access token with the following format 

```
{
   "token": "<ACCESS_TOKEN>"
}
```


You should send this authorization with any request to the protected endpoints

```
Authorization: Bearer <ACCESS_TOKEN>
```

 
## Refs:
- [How to generate a refresh token?](https://stackoverflow.com/questions/56133083/how-to-generate-a-refresh-token)
- [How can I use refresh token in react](https://stackoverflow.com/questions/72410388/how-can-i-use-refresh-token-in-react)
- [Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) 
- [List of HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
- [Best way to check jwt token expire status if stored in localstorage](https://stackoverflow.com/questions/69359599/best-way-to-check-jwt-token-expire-status-if-stored-in-localstorage)
- [Title](https://stackoverflow.com/questions/32060478/is-a-refresh-token-really-necessary-when-using-jwt-token-authentication) 
- [Title](https://www.udemy.com/course/advanced-oauth-security/?referralCode=E986334DCA7052166B3F) 
- [Title](https://security.stackexchange.com/questions/119371/is-refreshing-an-expired-jwt-token-a-good-strategy) 
- [node-js-console-log-in-txt-file](https://stackoverflow.com/questions/41232578/node-js-console-log-in-txt-file) 
- [Title](https://github.com/codeforgeek/payload-validator) 
- [Title](url) 
- [Title](url) 

  

## Check out these tutorials: 
- [fake-api-jwt-json-server](https://www.techiediaries.com/fake-api-jwt-json-server/)
- [JWT tutorial: In-depth Introduction to JSON Web Token](https://www.bezkoder.com/jwt-json-web-token/)
- [json-server](https://github.com/typicode/json-server) 
- [Title](https://regex101.com/ ) 
- [Title](url) 
- [Title](url) 
- [Title](url) 




#----------------------------------------------------------------
- https://oauth.net/code/
- https://auth0.com/  
  
#----------------------------------------------------------------










## npm-packages
 
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) 
- [core-js](https://www.npmjs.com/package/core-js) 
- [open](https://www.npmjs.com/package/open) 
- [bcrypt](https://www.npmjs.com/package/bcrypt) 
- [node-authorization](https://www.npmjs.com/package/node-authorization) 
- [cors](https://www.npmjs.com/package/cors)
- [log4js-node](https://github.com/log4js-node/log4js-node)  
- [Title](url) 
- [Title](url) 







# 
- https://heiswayi.github.io/thinkspace/
- https://github.com/heiswayi/thinkspace
- https://jekyllrb.com/
- https://jekyllthemes.io/free
- 
- 
- 
- JWT.io is an interactive playground for learning more about JWTs. 





#----------------------------------------------------------------
accessToken/refreshToken

- A refresh-token is just a random string generated by the authentication server after successful authentication (for example, if the username and password of the user are valid). Their sole purpose is to remove the need to exchange user credentials repeatedly. 
- All the user-related information including claims go in access-tokens
- 
- 
- The refresh token is stored in the database against the userId, in a collection called UserToken.

// login
		{
			"username": "Zizou87",
			"password": "my-super-secret-password"
		}
// 
  