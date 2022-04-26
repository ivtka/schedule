import { Day, DayType } from '@prisma/client';
import { BadRequestError } from '../errors/BadRequestError';

export default function getDay(day?: string): DayType {
  if (day === 'Monday') return DayType.MONDAY;
  if (day === "Tuesday") return DayType.TUESDAY;
  if (day === "Wednesday") return DayType.WEDNESDAY;
  if (day === "Thursday") return DayType.THURSDAY;
  if (day === "Friday") return DayType.FRIDAY;
  throw new BadRequestError("Invalid day");
}