import { AvailabilityDay } from "@/types/doctors";

export const specialties = [
  "All",
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Family Medicine",
  "Neurology",
  "Obstetrics & Gynecology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
];

export const availabilityOptions = [
  "All",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export const DayAbbreviation: Record<
  Exclude<AvailabilityDay, "All">,
  string
> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
};
