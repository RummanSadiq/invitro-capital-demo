export enum Specialties {
  All = "All",
  Cardiology = "Cardiology",
  Dermatology = "Dermatology",
  Endocrinology = "Endocrinology",
  FamilyMedicine = "Family Medicine",
  Neurology = "Neurology",
  ObstetricsGynecology = "Obstetrics & Gynecology",
  Ophthalmology = "Ophthalmology",
  Orthopedics = "Orthopedics",
  Pediatrics = "Pediatrics",
  Psychiatry = "Psychiatry",
}

export type Doctor = {
  id: number;
  name: string;
  photo: string;
  specialty: string;
  availability: string[];
  location: string;
  rating?: number;
  reviews?: number;
};

export enum AvailabilityDay {
  All = "All",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
}

export type TimeSlot = {
  id: string;
  date: Date;
  available: boolean;
};
