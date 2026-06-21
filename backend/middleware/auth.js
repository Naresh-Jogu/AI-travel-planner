const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // getting valid auth head
  const authHeader = req.header("Authorization");

  // validating headers
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No Token" });
  }

  // extracting token from headers
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
