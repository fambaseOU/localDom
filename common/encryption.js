import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const TAG_LENGTH = 16;

/**
 * Encrypts a string using AES-256-GCM.
 * This provides End-to-End Encryption (E2EE) for tunneled traffic.
 * 
 * @param {string} text - The plaintext string to encrypt.
 * @param {string} secret - The master ENCRYPTION_SECRET.
 * @returns {string} A colon-separated string in the format: `[iv]:[tag]:[encryptedPayload]`.
 * @throws {Error} If key derivation fails.
 */
export function encrypt(text, secret) {
  if (!secret) return text; 
  
  const key = crypto.scryptSync(secret, 'localdom-salt', 32);
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  
  const tag = cipher.getAuthTag().toString('base64');
  return `${iv.toString('base64')}:${tag}:${encrypted}`;
}

/**
 * Decrypts a string previously encrypted with encrypt().
 * Validates the authentication tag to ensure data integrity.
 * 
 * @param {string} encryptedData - The colon-separated encrypted blob.
 * @param {string} secret - The master ENCRYPTION_SECRET.
 * @returns {string} The decrypted plaintext string.
 * @throws {Error} If decryption fails or the authentication tag is invalid.
 */
export function decrypt(encryptedData, secret) {
  if (!secret || !encryptedData.includes(':')) return encryptedData;

  try {
    const [ivBase64, tagBase64, payload] = encryptedData.split(':');
    const key = crypto.scryptSync(secret, 'localdom-salt', 32);
    const iv = Buffer.from(ivBase64, 'base64');
    const tag = Buffer.from(tagBase64, 'base64');
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);
    
    let decrypted = decipher.update(payload, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    console.error('🔓 Decryption failed. Incorrect secret?');
    throw new Error('Decryption failed');
  }
}
