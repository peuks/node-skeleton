import { Request, Response, NextFunction, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ response: 'Hello from  VendorROUTE' });
});
export { router as VandorRoute };
