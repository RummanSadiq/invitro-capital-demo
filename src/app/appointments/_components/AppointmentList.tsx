import { FunctionComponent } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import classNames from "classnames";
import Image from "next/image";
import doctorImg from "@/assets/doctorImg.png";
import { Appointment } from "@/types/appointment";

type Props = {
  appointment: Appointment;
};

export const AppointmentCard: FunctionComponent<Props> = ({ appointment }) => {
  return (
    <Card
      key={appointment.id}
      className={classNames("overflow-hidden gap-1")}
      role="region"
      aria-labelledby={`appointment-title-${appointment.id}`}
    >
      <CardHeader className={classNames("pb-2")}>
        <div className={classNames("flex justify-between items-start")}>
          <div className={classNames("flex items-center")}>
            <div
              className={classNames(
                "h-10 w-10 flex-shrink-0 border border-gray-200 rounded-full mr-3 overflow-hidden relative"
              )}
              aria-hidden="true"
            >
              <Image
                src={doctorImg}
                alt={`Profile picture of Dr. ${appointment.doctor.name}`}
                fill
                className={classNames("object-cover")}
                sizes="(max-width: 768px) 40px, 40px"
                priority
              />
            </div>
            <div>
              <CardTitle
                id={`appointment-title-${appointment.id}`}
                className={classNames("text-lg")}
              >
                {appointment.doctor.name}
              </CardTitle>
              <CardDescription>{appointment.doctor.specialty}</CardDescription>
            </div>
          </div>
          <Badge
            variant="outline"
            className={classNames(
              "bg-green-50 text-green-700 border-green-200"
            )}
            role="status"
            aria-label="Appointment Status: Upcoming"
          >
            Upcoming
          </Badge>
        </div>
      </CardHeader>
      <CardContent
        className={classNames("pb-2")}
        aria-label="Appointment Details"
      >
        <div className={classNames("space-y-2 text-xs sm:text-sm")} role="list">
          <div
            className={classNames("flex justify-start items-center")}
            role="listitem"
          >
            <Calendar
              className={classNames("h-4 w-4 mr-2 text-gray-500")}
              aria-hidden="true"
            />
            <span>{formatDate(appointment.timeSlot.date).dateOnly}</span>
          </div>
          <div
            className={classNames("flex justify-start items-center")}
            role="listitem"
          >
            <Clock
              className={classNames("h-4 w-4 mr-2 text-gray-500")}
              aria-hidden="true"
            />
            <span>{formatDate(appointment.timeSlot.date).timeOnly}</span>
          </div>
          <div
            className={classNames("flex justify-start items-center")}
            role="listitem"
          >
            <MapPin
              className={classNames("h-4 w-4 mr-2 text-gray-500")}
              aria-hidden="true"
            />
            <span>{appointment.doctor.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
