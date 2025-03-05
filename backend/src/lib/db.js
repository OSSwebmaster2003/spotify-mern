import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to database ${res.connection.host}`);
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1); // 1==> failure msg
  }
};
