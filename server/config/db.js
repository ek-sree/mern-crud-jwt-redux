import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log('database connect successfully');
    } catch (error) {
        console.log(`Error - ${error.message}`);
        process.exit(1)
    }
}

export default connectDB