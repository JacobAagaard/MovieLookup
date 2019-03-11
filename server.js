const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt"); //Validate JWT and set req.user
const jwksRsa = require("jwks-rsa"); //Retrieve RSA keys from a JSON Web Key set (JWKS) endpoint
const checkScope = require("express-jwt-authz"); // Validate JWT scopes

const jwtCheck = jwt({
  // Dynamically provide a signing key based on the kid in the header
  // and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true, // Cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // Prevent attackers from requesting more than 5 per minute.
    jwksUri: `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/.well-known/jwks.json`
  }),
  // Validate both audience and the issuer.
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  // This is the Auth0 algorithm used for authorization
  algorithms: ["RS256"]
});

const app = express();

app.get("/public", function(req, res) {
  res.json({
    message: "Hello from a public API !"
  });
});

// Uses above jwt check
app.get("/private", jwtCheck, function(req, res) {
  res.json({
    message: "Hello from a private API !"
  });
});

// Several auth checks can be declared the app.get
app.get("/course", jwtCheck, checkScope(["read:courses"]), function(req, res) {
  res.json({
    courses: [{ id: 1, title: "Title #1" }, { id: 2, title: "Title #2" }]
  });
});

// Our own middleware function
function checkRole(role) {
  return function(req, res, next) {
    const assignedRoles = req.user["http://localhost:3000/roles"];
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next(); // Success scenario, calls next middleware function
    } else {
      return res.status(401).send("Insufficient role");
    }
  };
}

app.get("/admin", jwtCheck, checkRole("admin"), function(req, res) {
  res.json({
    message: "Hello from an admin API !"
  });
});

app.listen(3001);
console.log("API server listening on " + process.env.REACT_APP_API_URL);
