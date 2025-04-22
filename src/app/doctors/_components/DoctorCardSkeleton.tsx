import { FunctionComponent } from "react";
import classNames from "classnames";
import { Skeleton } from "@/components/ui/skeleton";

export const DoctorCardSkeleton: FunctionComponent = () => {
  return (
    <div className={classNames("border rounded-lg p-6 bg-white space-y-4")}>
      <div className={classNames("flex items-center space-x-4")}>
        <Skeleton className={classNames("h-16 w-16 rounded-full")} />
        <div className={classNames("space-y-2")}>
          <Skeleton className={classNames("h-5 w-32")} />
          <Skeleton className={classNames("h-4 w-24")} />
        </div>
      </div>
      <div className={classNames("space-y-2")}>
        <Skeleton className={classNames("h-4 w-full")} />
        <Skeleton className={classNames("h-4 w-full")} />
      </div>
      <Skeleton className={classNames("h-10 w-full mt-4")} />
    </div>
  );
};
