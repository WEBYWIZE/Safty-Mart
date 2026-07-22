import { payuService, PayUResponseParams } from '../services/payu.service.js';

export function verifyPayUResponse(responseData: PayUResponseParams): {
  isValid: boolean;
  message: string;
  generatedHash?: string;
  receivedHash?: string;
} {
  if (!responseData || !responseData.hash) {
    console.error('[PayU Verification Error] Missing PayU response hash parameter in callback payload.');
    return {
      isValid: false,
      message: 'Missing PayU response hash parameter.',
    };
  }

  const { isValid, generatedHash, receivedHash } = payuService.verifyPaymentHashDetails(responseData);

  if (!isValid) {
    return {
      isValid: false,
      message: 'PayU SHA512 hash signature mismatch. Payment verification failed.',
      generatedHash,
      receivedHash,
    };
  }

  const normalizedStatus = (responseData.status || '').toLowerCase().trim();
  if (normalizedStatus !== 'success') {
    return {
      isValid: false,
      message: `PayU payment status is ${responseData.status}`,
      generatedHash,
      receivedHash,
    };
  }

  return {
    isValid: true,
    message: 'PayU payment successfully verified.',
    generatedHash,
    receivedHash,
  };
}
