import { z } from "zod";

export const createOrderSchema = z.object({
  planId: z.string().min(1, "Plan ID is required"),
  amount: z.number().positive("Amount must be a positive number"),
  credits: z.number().int().positive("Credits must be a positive integer"),
});

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1, "Razorpay Order ID is required"),
  razorpay_payment_id: z.string().min(1, "Razorpay Payment ID is required"),
  razorpay_signature: z.string().min(1, "Razorpay Signature is required"),
});
