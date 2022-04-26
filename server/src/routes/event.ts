import { Router } from "express";
import { body } from "express-validator";
import prisma from '../client';

const router = Router();

router.push('/event', async (req: Request, res: Response) => {
  const { name, day, date, Day } = req.body;

  const event = await prisma.event.create({
    data: {
      name,
      day,
      date,
      Day
    }
  })

  res.status(201).json({ success: true, data: event });
})