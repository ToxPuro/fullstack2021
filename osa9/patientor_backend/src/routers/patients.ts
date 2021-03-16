import express from 'express';
import PatientService from '../services/patientService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(PatientService.getNoSnnPatients());
});

router.post('/', (req,res) => {
  const newPatientEntry = PatientService.toNewPatientEntry(req.body);
  const newPatient = PatientService.addPatient(newPatientEntry);
  res.json(newPatient);
});

export default router;