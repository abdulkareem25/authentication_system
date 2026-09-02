import app from "./src/app.js";
import "dotenv/config";
import connectDB from "./src/config/db.js";


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
  connectDB();
});