export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;