
import { Router } from 'express';
import calculatorRouter from './calculator';
import operationsRouter from './operations';
import historyRouter from './history';
import mongoRouter from './mongo';
const router = Router();


router.use('/calculator', calculatorRouter); //should be renamed to controller
router.use('/operations', operationsRouter);
router.use('/history', historyRouter);
router.use('/mongo', mongoRouter);

export default router;