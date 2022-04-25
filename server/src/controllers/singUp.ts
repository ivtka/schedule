import prisma from '../client';
import { Request, Response } from 'express';
import { Password } from '../utils/password';
import { BadRequestError } from '../errors/BadRequestError';
import generateToken from '../utils/generateToken';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password: enteredPassword } = req.body;

    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userExists) {
      throw new BadRequestError('User already exists');
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: await Password.toHash(enteredPassword)
      }
    });

    const { password, createdAt, updatedAt, ...newUser } = user;

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      data: { ...newUser, token }
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(400).json({ success: false, message });
  }
}