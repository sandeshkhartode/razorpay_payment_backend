import express from "express";
import {
  createOrder,
  paymentVerification,
  getPaymentDetails
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/create-order").post(createOrder);

router.route("/paymentverification").post(paymentVerification);

// for teting using whole backend 
router.route("/capture-payment").post(getPaymentDetails);

export default router;
