import crypto from 'crypto';

const TOKEN_SECRET_ENV = 'MCP_TOKEN_SECRET';

const getSecretKey = () => {
  const secret = process.env[TOKEN_SECRET_ENV];
  if (!secret) {
    throw new Error(`Missing ${TOKEN_SECRET_ENV} env var`);
  }

  return crypto.createHash('sha256').update(secret).digest();
};

export const encryptSecret = (plaintext: string) => {
  const iv = crypto.randomBytes(12);
  const key = getSecretKey();
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}.${tag.toString('hex')}.${encrypted.toString('hex')}`;
};

export const maskSecret = (value: string) => {
  if (!value) return '';
  if (value.length <= 8) return '*'.repeat(value.length);
  return `${value.slice(0, 4)}****${value.slice(-4)}`;
};
