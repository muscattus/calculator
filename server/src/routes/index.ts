
import { Router } from 'express';
import calculatorRouter from './calculator';
import operationsRouter from './operations';
const router = Router();


router.use('/calculator', calculatorRouter);
router.use('/operations', operationsRouter);

export default router;