import { Request, Response, NextFunction, Router } from 'express';
import { CreateVandor, GetVanndors, GetVandorByID } from '../controllers/AdminController';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ response: 'Hello from  ADMINROUTE' });
});

router.post('/vendor', CreateVandor);
router.get('/vendors', GetVanndors);
router.get('/vendor/:id', GetVandorByID);

export { router as AdminRoute };
