// import dotenv from "dotenv";

// dotenv.config();
// console.log("ENV CHECK:", process.env.MONGODB_URL);

// export const PORT = process.env.PORT;
import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5555;
export const mongoDBURL = process.env.MONGO_URI;
