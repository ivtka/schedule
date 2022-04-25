import { Request, Response } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import prisma from '../client'
import { Password } from '../utils/password';
import generateToken from '../utils/generateToken';

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await Password.compare(user.password, password);

    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    const { password, ...newUser } = user;

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      data: { ...newUser, token }
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(400).json({ success: false, message });
  }
}