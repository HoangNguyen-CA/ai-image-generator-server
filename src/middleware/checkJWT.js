const { auth } = require("express-oauth2-jwt-bearer");
const AppError = require("../errorHandling/AppError");

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJWT = (req, res, next) => {
  auth({
    audience: process.env.AUTH0_API_ID,
    issuerBaseURL: process.env.AUTH0_API_ISSUER,
  })(req, res, (error) => {
    if (error) {
      const customError = new AppError(error.status, error.message);
      return next(customError);
    }
    return next();
  });
};

module.exports = checkJWT;
