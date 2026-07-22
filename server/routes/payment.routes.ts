import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller.js';

const router = Router();

// PayU SHA512 Request Hash Generation Route
router.post('/hash', (req, res) => paymentController.generateHash(req, res));

// PayU SHA512 Response Hash Generation Route
router.post('/response-hash', (req, res) => paymentController.generateResponseHash(req, res));

// PayU Response Verification Route
router.post('/verify', (req, res) => paymentController.verifyPayment(req, res));

// PayU Success Callback Endpoint
router.post('/success', (req, res) => paymentController.handleSuccess(req, res));

// PayU Failed Callback Endpoint
router.post('/failed', (req, res) => paymentController.handleFailed(req, res));

// COD Payment Processing Route
router.post('/cod', (req, res) => paymentController.processCOD(req, res));

export default router;
