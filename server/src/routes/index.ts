
import { Router } from 'express';
import calculatorRouter from './calculator';
import operationsRouter from './operations';
import historyRouter from './history';
const router = Router();


router.use('/calculator', calculatorRouter); //should be renamed to controller
router.use('/operations', operationsRouter);
router.use('/history', historyRouter);

export default router;