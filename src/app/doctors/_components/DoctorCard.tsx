"use client";

import { FunctionComponent, useCallback, useState } from "react";
import { Doctor, TimeSlot } from "@/types/doctors";
import { Calendar, MapPin, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import classNames from "classnames";
import { useAppointmentContext } from "@/context/useAppointmentContext";
import { toast } from "sonner";
import { AppointmentAction } from "@/context/action";
import { AppointmentStatus } from "@/types/appointment";
import { Badge } from "@/components/ui/badge";
import { BookingModal } from "@/app/doctors/_components/BookingModal";
import { Button } from "@/components/ui/button";
import doctorImage from "@/assets/doctorImg.png";
import Image from "next/image";

type Props = {
  doctor: Doctor;
};

export const DoctorCard: FunctionComponent<Props> = ({ doctor }) => {
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const { dispatch } = useAppointmentContext();

  const handleBookAppointment = useCallback(
    (timeSlot: TimeSlot) => {
      const uniqueId = `appt-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // Simulate API delay
      setTimeout(() => {
        dispatch({
          type: AppointmentAction.SetAppointments,
          payload: [
            {
              doctor,
              timeSlot,
              createdAt: new Date(),
              status: AppointmentStatus.Upcoming,
              id: uniqueId,
            },
          ],
        });

        toast.success(
          `Your appointment with ${doctor.name} has been scheduled.`,
        );

        setShowBookingModal(false);
      }, 1000);
    },
    [dispatch, doctor],
  );

  return (
    <section>
      <Card
        className={classNames(
          "h-full transition-all hover:shadow-md overflow-hidden gap-1",
        )}
      >
        <CardHeader
          className={classNames("p-3 sm:p-6 pb-2 text-center sm:text-left")}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 items-center">
            <div className="h-16 w-16 flex-shrink-0 border border-gray-200 rounded-full mb-3 sm:mb-0 overflow-hidden relative">
              <Image
                src={doctorImage}
                alt={doctor.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 64px, 64px"
                priority
              />
            </div>
            <div className={classNames("min-w-0")}>
              <h3
                className={classNames(
                  "text-base sm:text-lg font-semibold truncate",
                )}
              >
                {doctor.name}
              </h3>
              <div
                className={classNames(
                  "flex flex-col flex-wrap items-center justify-center sm:justify-start gap-2 mt-1 sm:flex-row",
                )}
              >
                <Badge variant="secondary" className={classNames("text-xs")}>
                  {doctor.specialty}
                </Badge>

                {doctor.rating && (
                  <div
                    className={classNames(
                      "flex items-center text-xs text-amber-500",
                    )}
                  >
                    <Star
                      className={classNames(
                        "h-3 w-3 fill-current mr-1 flex-shrink-0",
                      )}
                    />
                    <span>{doctor.rating}</span>
                    {doctor.reviews && (
                      <span className={classNames("text-gray-500 ml-1")}>
                        ({doctor.reviews})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent
          className={classNames("space-y-2 p-3 sm:p-6 pt-0 sm:pt-2")}
        >
          <div
            className={classNames(
              "flex items-center justify-center sm:justify-start text-gray-600",
            )}
          >
            <Calendar size={14} className={classNames("mr-2 flex-shrink-0")} />
            <span className={classNames("text-xs sm:text-sm break-words")}>
              Available: {doctor.availability.join(", ")}
            </span>
          </div>
          <div
            className={classNames(
              "flex items-center justify-center sm:justify-start text-gray-600",
            )}
          >
            <MapPin size={14} className={classNames("mr-2 flex-shrink-0")} />
            <span className={classNames("text-xs sm:text-sm break-words")}>
              {doctor.location}
            </span>
          </div>
        </CardContent>
        <CardFooter className={classNames("p-3 sm:p-6 pt-2")}>
          <Button
            className={classNames(
              "w-full text-sm sm:text-base py-1.5 sm:py-2 h-auto hover:cursor-pointer",
            )}
            onClick={() => setShowBookingModal(true)}
          >
            Book Appointment
          </Button>
        </CardFooter>
      </Card>

      <BookingModal
        doctor={doctor}
        open={showBookingModal}
        onOpenChange={setShowBookingModal}
        onBookAppointment={handleBookAppointment}
      />
    </section>
  );
};
