import { Router, Request, Response } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import { body } from "express-validator";
import prisma from '../client';
import getDay from '../utils/getDayType';

const router = Router();

router.post('/event', async (req: Request, res: Response) => {
  try {
    const { name, day, date } = req.body;

    if (!day) {
      throw new BadRequestError('Day is required');
    }

    const event = await prisma.event.create({
      data: {
        name,
        Day: {
          create: {
            date: new Date(date),
            day: getDay(day),
          }
        }
      }
    })

    res.status(201).json({ success: true, data: event });

  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(400).json({ success: false, message });
  }
})

router.get('/event', async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        Day: {
          date: 'desc'
        }
      },
      include: {
        Day: {
          select: {
            day: true,
            date: true,
          }
        }
      },
    }).then(events => {
      return events.map(event => {
        const { name, Day } = event
        return { name, day: Day?.day };
      })
    })

    res.status(200).json({ success: true, data: events });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(400).json({ success: false, message });
  }
})

router.get('/event/:day', async (req: Request, res: Response) => {
  try {
    const day = req.params.day;

    if (!day) {
      throw new BadRequestError('Day is required');
    }

    const events = await prisma.event.findMany({
      where: {
        Day: {
          day: getDay(day as string),
        }
      }
    })

    res.status(200).json({ success: true, data: events });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(400).json({ success: false, message });
  }
})

export default router