import { Request, Response } from 'express';
import { payuService } from '../services/payu.service.js';
import { verifyPayUResponse } from '../utils/payment.verify.js';
import { db } from '../db.js';

export class PaymentController {
  /**
   * Endpoint to generate PayU SHA512 Hash for checkout
   * POST /api/payment/hash
   */
  public async generateHash(req: Request, res: Response): Promise<void> {
    try {
      const { txnid, amount, productinfo, firstname, email, udf1, udf2, udf3, udf4, udf5 } = req.body;

      if (!txnid || amount === undefined || amount === null || !productinfo || !firstname || !email) {
        res.status(400).json({
          success: false,
          error: 'Missing required parameters (txnid, amount, productinfo, firstname, email)',
        });
        return;
      }

      const hashParams = {
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        udf1,
        udf2,
        udf3,
        udf4,
        udf5,
      };

      // 1. Forward Request Hash
      const hash = payuService.generatePaymentHash(hashParams);

      // 2. Pre-computed Reverse Response Hash for success scenario
      const responseHash = payuService.generateResponseHash({
        ...hashParams,
        status: 'success',
      });

      const key = payuService.getKey();
      const actionUrl = payuService.getPayUUrl();

      res.status(200).json({
        success: true,
        key,
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        hash,            // Payment Request Hash
        responseHash,    // Expected Reverse Response Hash for Success
        actionUrl,
        payuEnv: process.env.PAYU_ENV || 'test',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to generate payment hash',
      });
    }
  }

  /**
   * Endpoint to generate PayU Response Hash explicitly
   * POST /api/payment/response-hash
   */
  public async generateResponseHash(req: Request, res: Response): Promise<void> {
    try {
      const responseData = req.body;
      const responseHash = payuService.generateResponseHash(responseData);

      res.status(200).json({
        success: true,
        responseHash,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to generate response hash',
      });
    }
  }

  /**
   * Endpoint to verify PayU Response
   * POST /api/payment/verify
   */
  public async verifyPayment(req: Request, res: Response): Promise<void> {
    try {
      const responseData = req.body;
      const verification = verifyPayUResponse(responseData);

      if (!verification.isValid) {
        res.status(400).json({
          success: false,
          verified: false,
          message: verification.message,
          generatedHash: verification.generatedHash,
          receivedHash: verification.receivedHash,
        });
        return;
      }

      // If valid, create or update order in DB
      let orderDetails = null;
      if (responseData.udf1) {
        try {
          orderDetails = JSON.parse(decodeURIComponent(responseData.udf1));
        } catch (_) {
          try {
            orderDetails = JSON.parse(responseData.udf1);
          } catch (_) {}
        }
      }

      const order = await db.createOrderFromPayment({
        payuPaymentId: responseData.mihpayid || `PAYU-${Date.now()}`,
        payuTxnId: responseData.txnid,
        payuHash: responseData.hash,
        status: 'SUCCESS',
        orderDetails,
      });

      res.status(200).json({
        success: true,
        verified: true,
        message: 'Payment verified and order confirmed successfully',
        order,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Error verifying payment',
      });
    }
  }

  /**
   * Handle PayU Success Callback POST
   * POST /api/payment/success
   */
  public async handleSuccess(req: Request, res: Response): Promise<void> {
    const responseData = req.body;
    const verification = verifyPayUResponse(responseData);

    if (verification.isValid) {
      let orderDetails = null;
      if (responseData.udf1) {
        try {
          orderDetails = JSON.parse(decodeURIComponent(responseData.udf1));
        } catch (_) {
          try {
            orderDetails = JSON.parse(responseData.udf1);
          } catch (_) {}
        }
      }

      await db.createOrderFromPayment({
        payuPaymentId: responseData.mihpayid || `PAYU-${Date.now()}`,
        payuTxnId: responseData.txnid,
        payuHash: responseData.hash,
        status: 'SUCCESS',
        orderDetails,
      });

      const appUrl = process.env.APP_URL || '';
      res.redirect(`${appUrl}/?page=payment-success&txnid=${responseData.txnid}&mihpayid=${responseData.mihpayid || ''}`);
    } else {
      const appUrl = process.env.APP_URL || '';
      res.redirect(`${appUrl}/?page=payment-failed&txnid=${responseData.txnid || ''}&reason=${encodeURIComponent(verification.message)}`);
    }
  }

  /**
   * Handle PayU Failure Callback POST
   * POST /api/payment/failed
   */
  public async handleFailed(req: Request, res: Response): Promise<void> {
    const responseData = req.body;
    const appUrl = process.env.APP_URL || '';
    res.redirect(`${appUrl}/?page=payment-failed&txnid=${responseData.txnid || ''}&reason=${encodeURIComponent(responseData.error_Message || 'Transaction failed or cancelled')}`);
  }

  /**
   * Handle COD Order Creation
   * POST /api/payment/cod
   */
  public async processCOD(req: Request, res: Response): Promise<void> {
    try {
      const { items, shippingAddress, subtotal, discount, couponCode, taxAmount, shippingFee, totalAmount } = req.body;

      if (!items || !shippingAddress || items.length === 0) {
        res.status(400).json({ success: false, error: 'Invalid order payload' });
        return;
      }

      const order = await db.createCODOrder({
        items,
        shippingAddress,
        subtotal,
        discount,
        couponCode,
        taxAmount,
        shippingFee,
        totalAmount,
      });

      res.status(201).json({
        success: true,
        order,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

export const paymentController = new PaymentController();
