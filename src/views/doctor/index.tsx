"use client";

import { FunctionComponent, useCallback, useMemo, useState } from "react";
import { AvailabilityDay, Specialties } from "@/types/doctors";
import { mockDoctors } from "@/data/doctors";
import classNames from "classnames";
import { DoctorFilter } from "@/app/doctors/_components/DoctorFilter";
import { Badge } from "@/components/ui/badge";
import { DoctorList } from "@/app/doctors/_components/DoctorList";
import { DayAbbreviation } from "@/lib/constants";

export const DoctorView: FunctionComponent = () => {
  const [filters, setFilters] = useState<{
    specialty: string;
    availability: AvailabilityDay;
  }>({
    specialty: Specialties.All,
    availability: AvailabilityDay.All,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filteredDoctors = useMemo(() => {
    const { specialty, availability } = filters;
    let results = mockDoctors;

    if (specialty !== Specialties.All) {
      results = results.filter((doctor) => doctor.specialty === specialty);
    }

    if (availability !== AvailabilityDay.All) {
      const shortDay =
        DayAbbreviation[availability as Exclude<AvailabilityDay, "All">];
      results = results.filter((doctor) =>
        doctor.availability.some((day) => day.includes(shortDay)),
      );
    }

    return results;
  }, [filters]);

  const handleFilterChange = useCallback(
    (specialty: string, availability: AvailabilityDay) => {
      setIsLoading(true);

      // Use a single state update for related filter values
      setFilters({ specialty, availability });

      // Simulate API request delay
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    },
    [],
  );
  const totalDoctors = useMemo(() => filteredDoctors.length, [filteredDoctors]);

  return (
    <div className={classNames("container mx-auto px-4 py-8")}>
      <div className={classNames("mb-8 flex flex-col gap-2")}>
        <h1 className={classNames("text-3xl font-bold")}>Find a Doctor</h1>
        <p className={classNames("text-gray-600")}>
          Browse our network of qualified healthcare professionals
        </p>
      </div>

      {/* Filter component */}
      <DoctorFilter
        specialtyFilter={filters.specialty}
        availabilityFilter={filters.availability}
        onFilterChange={handleFilterChange}
      />

      {/* Results summary */}
      <div className={classNames("mb-6 flex items-center justify-between")}>
        <div className={classNames("flex items-center gap-2")}>
          <span className={classNames("text-sm text-gray-600")}>
            Showing {totalDoctors} {totalDoctors === 1 ? "doctor" : "doctors"}
          </span>
          {filters.specialty !== Specialties.All && (
            <Badge variant="secondary" className={classNames("text-xs")}>
              {filters.specialty}
            </Badge>
          )}
          {filters.availability !== AvailabilityDay.All && (
            <Badge variant="secondary" className={classNames("text-xs")}>
              {filters.availability}
            </Badge>
          )}
        </div>
      </div>

      {/* Doctor list component */}
      <DoctorList doctors={filteredDoctors} isLoading={isLoading} />
    </div>
  );
};
