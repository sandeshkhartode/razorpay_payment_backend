import express from "express";
import {
  createOrder,
  paymentVerification
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/create-order").post(createOrder);

router.route("/payment-verification").post(paymentVerification);

export default router;
