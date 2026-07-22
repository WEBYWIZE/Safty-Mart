import crypto from 'crypto';

export interface PayUHashParams {
  txnid: string;
  amount: string | number;
  productinfo: string;
  firstname: string;
  email: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  udf6?: string;
  udf7?: string;
  udf8?: string;
  udf9?: string;
  udf10?: string;
  key?: string;
  salt?: string;
}

export interface PayUResponseParams {
  key?: string;
  txnid: string;
  amount: string | number;
  productinfo: string;
  firstname: string;
  email: string;
  status: string;
  mihpayid?: string;
  hash?: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  udf6?: string;
  udf7?: string;
  udf8?: string;
  udf9?: string;
  udf10?: string;
  additionalCharges?: string;
  salt?: string;
}

export interface PayUVerificationResult {
  isValid: boolean;
  generatedHash: string;
  receivedHash: string;
  hashString: string;
}

export class PayUService {
  private key: string;
  private salt: string;
  private env: string;

  constructor() {
    this.key = (process.env.PAYU_KEY || 'payu_test_key_safty_mart').trim();
    this.salt = (process.env.PAYU_SALT || 'payu_test_salt_safty_mart').trim();
    this.env = (process.env.PAYU_ENV || 'test').trim();
  }

  public getPayUUrl(): string {
    return this.env === 'live'
      ? 'https://secure.payu.in/_payment'
      : 'https://test.payu.in/_payment';
  }

  /**
   * Generate SHA512 Hash for PayU Payment Request (Forward Hash)
   * Official PayU Sequence:
   * key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10|SALT
   */
  public generatePaymentHash(params: PayUHashParams): string {
    const merchantKey = (params.key || this.key).trim();
    const merchantSalt = (params.salt || this.salt).trim();
    const txnid = (params.txnid || '').trim();
    const formattedAmount = Number(params.amount).toFixed(2);
    const productinfo = (params.productinfo || '').trim();
    const firstname = (params.firstname || '').trim();
    const email = (params.email || '').trim();
    const udf1 = params.udf1 || '';
    const udf2 = params.udf2 || '';
    const udf3 = params.udf3 || '';
    const udf4 = params.udf4 || '';
    const udf5 = params.udf5 || '';
    const udf6 = params.udf6 || '';
    const udf7 = params.udf7 || '';
    const udf8 = params.udf8 || '';
    const udf9 = params.udf9 || '';
    const udf10 = params.udf10 || '';

    const hashString = `${merchantKey}|${txnid}|${formattedAmount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}|${udf6}|${udf7}|${udf8}|${udf9}|${udf10}|${merchantSalt}`;

    const generatedHash = crypto.createHash('sha512').update(hashString).digest('hex').toLowerCase();

    console.log('[PayU Forward Hash Generation]');
    console.log('Key           :', merchantKey);
    console.log('Txn ID        :', txnid);
    console.log('Amount        :', formattedAmount);
    console.log('Hash Sequence :', hashString);
    console.log('Generated Hash:', generatedHash);

    return generatedHash;
  }

  /**
   * Generate SHA512 Response Hash for PayU Callback (Reverse Hash)
   * Official PayU Sequence (without additionalCharges):
   * SALT|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
   *
   * Official PayU Sequence (with additionalCharges):
   * additionalCharges|SALT|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
   */
  public generateResponseHash(params: PayUResponseParams): string {
    const merchantKey = (params.key || this.key).trim();
    const merchantSalt = (params.salt || this.salt).trim();
    const txnid = (params.txnid || '').trim();
    const formattedAmount = Number(params.amount).toFixed(2);
    const productinfo = (params.productinfo || '').trim();
    const firstname = (params.firstname || '').trim();
    const email = (params.email || '').trim();
    const status = (params.status || 'success').trim();
    const udf1 = params.udf1 || '';
    const udf2 = params.udf2 || '';
    const udf3 = params.udf3 || '';
    const udf4 = params.udf4 || '';
    const udf5 = params.udf5 || '';
    const udf6 = params.udf6 || '';
    const udf7 = params.udf7 || '';
    const udf8 = params.udf8 || '';
    const udf9 = params.udf9 || '';
    const udf10 = params.udf10 || '';

    let hashString = '';
    if (params.additionalCharges && params.additionalCharges.trim() !== '') {
      const addCharges = params.additionalCharges.trim();
      hashString = `${addCharges}|${merchantSalt}|${status}|${udf10}|${udf9}|${udf8}|${udf7}|${udf6}|${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${formattedAmount}|${txnid}|${merchantKey}`;
    } else {
      hashString = `${merchantSalt}|${status}|${udf10}|${udf9}|${udf8}|${udf7}|${udf6}|${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${formattedAmount}|${txnid}|${merchantKey}`;
    }

    return crypto.createHash('sha512').update(hashString).digest('hex').toLowerCase();
  }

  /**
   * Verify SHA512 Response Hash from PayU Callback with Detailed Audit Logging
   */
  public verifyPaymentHashDetails(params: PayUResponseParams): PayUVerificationResult {
    const receivedHash = (params.hash || '').trim().toLowerCase();
    const generatedHash = this.generateResponseHash(params);
    const isValid = generatedHash === receivedHash;

    const merchantKey = (params.key || this.key).trim();
    const merchantSalt = (params.salt || this.salt).trim();
    const txnid = (params.txnid || '').trim();
    const formattedAmount = Number(params.amount).toFixed(2);
    const productinfo = (params.productinfo || '').trim();
    const firstname = (params.firstname || '').trim();
    const email = (params.email || '').trim();
    const status = (params.status || 'success').trim();
    const udf1 = params.udf1 || '';
    const udf2 = params.udf2 || '';
    const udf3 = params.udf3 || '';
    const udf4 = params.udf4 || '';
    const udf5 = params.udf5 || '';
    const udf6 = params.udf6 || '';
    const udf7 = params.udf7 || '';
    const udf8 = params.udf8 || '';
    const udf9 = params.udf9 || '';
    const udf10 = params.udf10 || '';

    let hashString = '';
    if (params.additionalCharges && params.additionalCharges.trim() !== '') {
      hashString = `${params.additionalCharges.trim()}|${merchantSalt}|${status}|${udf10}|${udf9}|${udf8}|${udf7}|${udf6}|${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${formattedAmount}|${txnid}|${merchantKey}`;
    } else {
      hashString = `${merchantSalt}|${status}|${udf10}|${udf9}|${udf8}|${udf7}|${udf6}|${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${formattedAmount}|${txnid}|${merchantKey}`;
    }

    console.log('================ PAYU REVERSE HASH VERIFICATION ================');
    console.log('Transaction ID     :', txnid);
    console.log('Amount             :', formattedAmount);
    console.log('Status             :', status);
    console.log('Reverse Hash String:', hashString);
    console.log('Generated Hash     :', generatedHash);
    console.log('Received Hash      :', receivedHash);
    console.log('Verification Status:', isValid ? 'SUCCESS (MATCH)' : 'FAILED (MISMATCH)');
    console.log('================================================================');

    return {
      isValid,
      generatedHash,
      receivedHash,
      hashString,
    };
  }

  public verifyPaymentHash(params: PayUResponseParams): boolean {
    return this.verifyPaymentHashDetails(params).isValid;
  }

  public getKey(): string {
    return this.key;
  }

  public getSalt(): string {
    return this.salt;
  }
}

export const payuService = new PayUService();
