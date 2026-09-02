import mongoose from "mongoose";

if(!process.env.MONGODB_URI){
  throw new Error("MONGODB_URI is not defined in the environment variables");
}

const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
}

export default connectDB;