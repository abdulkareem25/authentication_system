import jwt from "jsonwebtoken";

const refereshTokenGenerator = (userId) => {
  const payload = { userId };

  const options = {
    expiresIn: "7d", // Refresh token expires in 7 days
  };

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    options
  );
  return refreshToken;
}

const authTokenGenerator = (userId) => {
  const payload = { userId };

  const options = {
    expiresIn: "1h", // Auth token expires in 1 hour
  };

  const authToken = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    options
  );
  return authToken;
}


export { refereshTokenGenerator, authTokenGenerator };