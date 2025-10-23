import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = process.env.CRYPTO_SECRET!;
const ivLength = 16; // comprimento do vetor de inicialização

export function encrypt(text: string) {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'utf-8').slice(0, 32), iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(encryptedText: string) {
  const [ivHex, encryptedHex] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'utf-8').slice(0, 32), iv);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString('utf8');
}
