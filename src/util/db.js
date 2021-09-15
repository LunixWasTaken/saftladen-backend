import Mongoose from "mongoose";

const connectDB = async () => {
  try {
    await Mongoose.connect(
        process.env.mongoAuth,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
