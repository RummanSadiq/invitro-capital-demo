"use client";

import { useState, useEffect } from "react";
import { useAppointmentContext } from "@/context/useAppointmentContext";
import classNames from "classnames";
import { Appointment, AppointmentStatus } from "@/types/appointment";
import { AppointmentSkeleton } from "@/app/appointments/_components/AppointmenSkeleton";
import { AppointmentEmptyState } from "@/app/appointments/_components/AppointmentEmptyState";
import { AppointmentCard } from "@/app/appointments/_components/AppointmentList";

export default function AppointmentSection() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    Appointment[]
  >([]);

  const {
    state: { appointments },
  } = useAppointmentContext();

  useEffect(() => {
    const upcoming = appointments.filter(
      (appointment) => appointment.status === AppointmentStatus.Upcoming,
    );
    setUpcomingAppointments(upcoming);
    setIsLoading(false);
  }, [appointments]);

  return (
    <section>
      {isLoading && <AppointmentSkeleton />}
      {upcomingAppointments.length ? (
        <div className={classNames("grid gap-4 md:grid-cols-2")}>
          {upcomingAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      ) : (
        <AppointmentEmptyState />
      )}
    </section>
  );
}
