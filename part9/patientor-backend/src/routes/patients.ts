/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import exprss from "express";
import patientService from "../services/patientService";
import toNewPatient, { toNewEntry } from "../../utils";

const router = exprss.Router();

router.get("/", (_req, res) => res.send(patientService.getNonSSNPatients()));

router.get("/:id", (req, res) => {
  try {
    const patient = patientService.findById(req.params.id);
    res.send(patient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/", (req, res) => {
  try {
    // newPatient for sending req.body to toNewPatient and
    // ready for creating parsers for each of the fields of object
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/:id/entries", (req, res) => {
  const entry = patientService.findById(req.params.id);
  if (entry) {
    try {
      const newentry = toNewEntry(req.body);
      const addedEntry = patientService.addEntry(entry, newentry);
      res.status(200).json(addedEntry);
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res.status(404).send({ error: "pstient does not exist" });
  }
});

export default router;
