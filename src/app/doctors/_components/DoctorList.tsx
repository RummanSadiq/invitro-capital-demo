import { Doctor } from "@/types/doctors";
import { DoctorCard } from "@/app/doctors/_components/DoctorCard";
import classNames from "classnames";
import { FunctionComponent } from "react";
import { DoctorCardSkeleton } from "@/app/doctors/_components/DoctorCardSkeleton";

type Props = {
  doctors: Doctor[];
  isLoading?: boolean;
};

export const DoctorList: FunctionComponent<Props> = ({
  doctors,
  isLoading = false,
}) => {
  return (
    <div role="region" aria-label="Doctor Search Results" aria-busy={isLoading}>
      {isLoading && (
        <div
          className={classNames(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          )}
          role="list"
          aria-label="Loading doctor results"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <DoctorCardSkeleton key={index} />
          ))}
        </div>
      )}
      {!!doctors.length ? (
        <div
          className={classNames(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          )}
          role="list"
          aria-label="Doctor search results"
        >
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div
          className={classNames(
            "text-center py-16 bg-white rounded-lg shadow-sm"
          )}
          role="alert"
        >
          <h3
            className={classNames("text-xl font-medium text-gray-900 mb-2")}
            id="no-doctors-title"
          >
            No doctors found
          </h3>
          <p
            className={classNames("text-gray-500")}
            aria-describedby="no-doctors-title"
          >
            Try adjusting your filters to find available doctors.
          </p>
        </div>
      )}
    </div>
  );
};
