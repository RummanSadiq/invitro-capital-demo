import { Doctor, TimeSlot } from "@/types/doctors";

export enum AppointmentStatus {
  Upcoming = "upcoming",
  Completed = "completed",
  Cancelled = "cancelled",
}

export type Appointment = {
  id: string;
  doctor: Doctor;
  timeSlot: TimeSlot;
  createdAt: Date;
  status: AppointmentStatus;
};
