import express from 'express';
import DiagnoseService from '../services/diagnoseService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(DiagnoseService.getDiagnoses());
});

export default router;