import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { validate } from "../middlewares/validate.js";
import {
  createOrderSchema,
  verifyPaymentSchema,
} from "../validations/paymentValidation.js";
import {
  createOrder,
  verifyPayment,
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post(
  "/order",
  isAuth,
  validate(createOrderSchema),
  createOrder,
);

paymentRouter.post(
  "/verify",
  isAuth,
  validate(verifyPaymentSchema),
  verifyPayment,
);

export default paymentRouter;
