import exprss from 'express';
import patientService from '../services/patientService';

const router = exprss.Router();

router.get('/', (_req, res) => res.send(patientService.getNonSSNPatients()));

router.post('/', (_req, res) => res.send('Saving a patients'));

export default router;