const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // If there is no auth header
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }

  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  // Verify the token
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_KEY);

    // Add the decoded token to the request object for use in routes
    req.user = decoded;

    // Move onto the endpoint
    next();
  } catch (error) {
    // Reject the request
    console.log(error);
    res.status(401).send("Invalid auth token");
  }
};
