import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const TAG_LENGTH = 16;

/**
 * Encrypts a string using AES-256-GCM.
 * Returns a base64 encoded string: [iv]:[tag]:[encryptedPayload]
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
