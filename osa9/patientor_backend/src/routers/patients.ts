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

router.get('/:id', (req, res) => {
  const patient = PatientService.getPatient(req.params.id)
  if(patient === undefined) res.status(404).end()
  res.send(PatientService.getPatient(req.params.id));
})

router.post('/:id/entries', (req, res) => {
  const newEntry =  PatientService.newEntry(req.body);
  const newPatient = PatientService.addEntryForPatient(newEntry, req.params.id);
  res.json(newPatient);
})

export default router;