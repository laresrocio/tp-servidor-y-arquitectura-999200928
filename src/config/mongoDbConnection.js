import { connect } from "mongoose";

const connectToMongoDB = async () => {
  try {
    await connect(process.env.URI_DB)
    console.log("Connected to MongoDB ✔")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

export { connectToMongoDB }