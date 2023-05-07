import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    const res = await mongoose.connect("mongodb+srv://mca2259:nOYbjrytiGShsMbX@cluster0.3cz2jgg.mongodb.net/?retryWrites=true&w=majority");
    if (res) {
      console.log("connected successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongo;
