import { FunctionComponent } from "react";
import classNames from "classnames";
import { Skeleton } from "@/components/ui/skeleton";

export const DoctorCardSkeleton: FunctionComponent = () => {
  return (
    <div
      className={classNames("border rounded-lg p-6 bg-white space-y-4")}
      role="status"
      aria-label="Loading doctor information"
    >
      <div className={classNames("flex items-center space-x-4")}>
        <Skeleton
          className={classNames("h-16 w-16 rounded-full")}
          aria-hidden="true"
        />
        <div className={classNames("space-y-2")}>
          <Skeleton className={classNames("h-5 w-32")} aria-hidden="true" />
          <Skeleton className={classNames("h-4 w-24")} aria-hidden="true" />
        </div>
      </div>
      <div className={classNames("space-y-2")}>
        <Skeleton className={classNames("h-4 w-full")} aria-hidden="true" />
        <Skeleton className={classNames("h-4 w-full")} aria-hidden="true" />
      </div>
      <Skeleton className={classNames("h-10 w-full mt-4")} aria-hidden="true" />
    </div>
  );
};
