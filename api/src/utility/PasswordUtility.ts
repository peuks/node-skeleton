import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { VendorPayload } from '../dto';
import { AuthPayload } from '../dto/Auth.dto';

const APP_SECRET = process.env.APP_SECRET || '238745623hsdf';

export const GenerateSalt = async () => await bcrypt.genSalt();

export const GeneratePassword = async (password: string, salt: string) =>
  await bcrypt.hash(password, salt);

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string,
) => (await GeneratePassword(enteredPassword, salt)) === savedPassword;

export const GenerateSignature = async (payload: AuthPayload) =>
  jwt.sign(payload, APP_SECRET, { expiresIn: '90d' });

export const ValidateSignature = async (req: Request) => {
  const signature = req.get('Authorization');

  if (!signature) return false;

  const payload = (await jwt.verify(signature.split(' ')[1], APP_SECRET)) as AuthPayload;
  req.user = payload;
  return true;
};
