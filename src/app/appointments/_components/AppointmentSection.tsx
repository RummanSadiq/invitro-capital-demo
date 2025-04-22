"use client";

import { useState, useEffect, useId } from "react";
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

  const sectionTitleId = useId();

  const {
    state: { appointments },
  } = useAppointmentContext();

  useEffect(() => {
    const upcoming = appointments.filter(
      (appointment) => appointment.status === AppointmentStatus.Upcoming
    );
    setUpcomingAppointments(upcoming);
    setIsLoading(false);
  }, [appointments]);

  return (
    <section aria-labelledby={sectionTitleId} aria-busy={isLoading}>
      <h2 id={sectionTitleId} className="sr-only">
        Upcoming Appointments
      </h2>

      {isLoading && (
        <div role="status" aria-label="Loading appointments">
          <AppointmentSkeleton />
        </div>
      )}

      {upcomingAppointments.length ? (
        <div
          className={classNames("grid gap-4 md:grid-cols-2")}
          role="list"
          aria-label="Upcoming Appointments"
        >
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} role="listitem">
              <AppointmentCard appointment={appointment} />
            </div>
          ))}
        </div>
      ) : (
        <div role="region" aria-label="No Upcoming Appointments">
          <AppointmentEmptyState />
        </div>
      )}
    </section>
  );
}
