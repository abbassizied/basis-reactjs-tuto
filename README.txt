# testing-main-reactjs-angular-jwt-concepts

- build a full stack Spring Boot + React.js Authentication example.
- The back-end server uses 
- The front-end will be created with React, React Router & Axios.
- 
- 
- 
- 
- 
 
## JWT (JSON Web Token)
### ref
### For more details, you can visit:
- https://www.bezkoder.com/spring-boot-react-jwt-auth/


- Nowaday, JWT is popular for Authentication and Information Exchange. Instead of creating a Session (Session-based Authentication), Server encodes data into a JSON Web Token and send it to the Client. The Client saves the JWT, then every Request from Client to protected routes or resources should be attached that JWT (commonly at header). The Server will validate that JWT and return the Response.
- Comparing with Session-based Authentication that need to store Session on Cookie, the big advantage of JWT (Token-based Authentication) is that we store the Token on Client side: Local Storage for Browser, Keychain for IOS and SharedPreferences for Android… So we don’t need to build another backend project that supports Native Apps or an additional Authentication module for Native App users.
- There are three important parts of a JWT: Header, Payload, Signature. Together they are combined to a standard structure: header.payload.signature.
- The Client typically attact JWT in Authorization header with Bearer prefix:

```
Authorization: Bearer [header].[payload].[signature]
```

- There are 2 endpoints for authentication: 
api/auth/signup for User Registration
api/auth/signin for User Login
- If Client wants to send request to protected data/endpoints, it add legal JWT to HTTP Authorization Header.
- 
- 
- 
- 
- 
 
## 
- 
- 
- 
- 
- 
- 
  
## 
- 
- 
- 
- 
- 
- 
