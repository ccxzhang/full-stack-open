import PatientData from "../../data/patients";
import { PatientEntry, NewPatientEntry } from "../types";
import { v4 as uuid } from 'uuid';
const id = uuid();

const patients: PatientEntry[] = PatientData;

const getEntries = (): PatientEntry[] => {
    return patients;
};

const findById = (id: string): PatientEntry | undefined => {
    const entry = patients.find(p => p.id === id);
    return entry;
};


const addPatitent = (entry: NewPatientEntry): PatientEntry => {
    const newPatitentEntry = {
        id: id,
        ...entry
    };

    patients.push(newPatitentEntry);
    return newPatitentEntry;
};


export default {
    getEntries,
    findById,
    addPatitent
}