import exprss from "express";
import patientService from "../services/patientService";
import toNewPatient from "../../utils";

const router = exprss.Router();

router.get("/", (_req, res) => res.send(patientService.getNonSSNPatients()));

router.get("/:id", (req, res) => {
  try {
    const patient = patientService.findById(req.params.id);
    res.send(patient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;
