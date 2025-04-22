import { Card, CardContent } from "@/components/ui/card";
import classNames from "classnames";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FunctionComponent } from "react";

export const AppointmentEmptyState: FunctionComponent = () => {
  return (
    <Card>
      <CardContent
        className={classNames(
          "flex flex-col items-center justify-center py-12 text-center",
        )}
      >
        <div className={classNames("rounded-full bg-gray-100 p-3 mb-4")}>
          <AlertCircle className={classNames("h-6 w-6 text-gray-500")} />
        </div>
        <h3 className={classNames("text-lg font-medium text-gray-900 mb-1")}>
          No Upcoming Appointments
        </h3>
        <p className={classNames("text-gray-500 mb-4 max-w-md")}>
          You don&apos;t have any upcoming appointments. Book a new appointment
          to see it here.
        </p>
        <Button asChild>
          <a href="/doctors">Book an Appointment</a>
        </Button>
      </CardContent>
    </Card>
  );
};
