import { Request, Response } from 'express';

export const authUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ success: true, data: req.currentUser });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(400).json({ success: false, message });
  }
}