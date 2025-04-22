import classNames from "classnames";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FunctionComponent } from "react";

export const AppointmentSkeleton: FunctionComponent = () => {
  return (
    <div
      className={classNames("grid gap-4 md:grid-cols-2")}
      role="region"
      aria-label="Loading Appointments"
    >
      {[1, 2].map((i) => (
        <Card
          key={i}
          className={classNames("overflow-hidden")}
          role="status"
          aria-label={`Loading Appointment ${i}`}
        >
          <CardHeader className={classNames("pb-2")}>
            <div className={classNames("flex justify-between items-start")}>
              <div className={classNames("flex items-center")}>
                <Skeleton
                  className={classNames("h-10 w-10 rounded-full mr-3")}
                  aria-hidden="true"
                />
                <div>
                  <Skeleton
                    className={classNames("h-5 w-32 mb-1")}
                    aria-hidden="true"
                  />
                  <Skeleton
                    className={classNames("h-4 w-20")}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <Skeleton className={classNames("h-6 w-20")} aria-hidden="true" />
            </div>
          </CardHeader>
          <CardContent className={classNames("pb-2")}>
            <div className={classNames("space-y-2")}>
              <Skeleton
                className={classNames("h-4 w-full")}
                aria-hidden="true"
              />
              <Skeleton
                className={classNames("h-4 w-full")}
                aria-hidden="true"
              />
              <Skeleton
                className={classNames("h-4 w-3/4")}
                aria-hidden="true"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className={classNames("h-9 w-full")} aria-hidden="true" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
