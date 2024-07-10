import { app } from "./app.js";
import Razorpay from "razorpay";
import { connectDB } from "./config/database.js";

await connectDB();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on ${process.env.PORT}`)
);
