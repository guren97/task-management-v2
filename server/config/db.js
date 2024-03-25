import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const connection_string = process.env.MONGODB_URI;
    await mongoose.connect(connection_string);
    console.log("Connected to database");
  } catch (error) {
    console.log(`Server connection error`);
  }
};

export default connectToDb;
