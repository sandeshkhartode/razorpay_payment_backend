import { instance } from "../server.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";

export const createOrder = async (req, res) => {
  console.log("req.body", req.body)
    const options = {
      amount: Number(req.body.amount * 100),
      // currency: "INR",
      currency: req.body.currency,
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  };

  export const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      // Database comes here
  
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
  
      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  };

  // for only backend use
  export const getPaymentDetails = async (req, res) => {
    const { payment_id, amount } = req.body;
  
    try {
      const captureResponse = await instance.payments.capture(payment_id, amount * 100, 'INR');
      res.status(200).json(captureResponse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };