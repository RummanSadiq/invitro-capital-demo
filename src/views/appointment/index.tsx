import { FunctionComponent } from "react";
import classNames from "classnames";
import AppointmentSection from "@/app/appointments/_components/AppointmentSection";

export const AppointmentView: FunctionComponent = () => {
  return (
    <div className={classNames("container mx-auto px-4 py-8")}>
      <div className={classNames("mb-8")}>
        <h1 className={classNames("text-3xl font-bold")}>My Appointments</h1>
        <p className={classNames("text-gray-600 mt-2")}>
          Manage your scheduled appointments
        </p>
      </div>

      <AppointmentSection />
    </div>
  );
};
