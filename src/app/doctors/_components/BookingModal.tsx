"use client";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  FunctionComponent,
} from "react";
import { Doctor, TimeSlot } from "@/types/doctors";
import { MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate, generateTimeSlots } from "@/lib/utils";
import classNames from "classnames";
import Image from "next/image";
import doctorImg from "@/assets/doctorImg.png";

type Props = {
  doctor: Doctor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookAppointment: (timeSlot: TimeSlot) => void;
};

export const BookingModal: FunctionComponent<Props> = ({
  doctor,
  open,
  onOpenChange,
  onBookAppointment,
}) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmBooking = useCallback(() => {
    if (!selectedSlot) return;

    setIsLoading(true);

    const slot = timeSlots.find((slot) => slot.id === selectedSlot);
    if (slot) {
      onBookAppointment(slot);
    }

    setIsLoading(false);
    setSelectedSlot(null);
  }, [selectedSlot, timeSlots, onBookAppointment]);

  // Group time slots by date for tab navigation
  const groupedSlots = useMemo(
    () =>
      timeSlots.reduce<Record<string, TimeSlot[]>>((acc, slot) => {
        const dateString = formatDate(slot.date).dateOnly;
        if (!acc[dateString]) {
          acc[dateString] = [];
        }
        acc[dateString].push(slot);
        return acc;
      }, {}),
    [timeSlots]
  );

  const availableDates = useMemo(
    () => Object.keys(groupedSlots),
    [groupedSlots]
  );

  // Reset and load time slots when the modal opens
  useEffect(() => {
    if (open) {
      setSelectedSlot(null);
      setTimeSlots(generateTimeSlots(doctor.id));
    }
  }, [doctor.id, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={classNames(
          "sm:max-w-md w-[95%] max-h-[90vh] overflow-y-auto p-4 sm:p-6"
        )}
      >
        <DialogHeader className="text-center sm:text-left">
          <DialogTitle className="text-lg sm:text-xl">
            Book an Appointment
          </DialogTitle>
          <DialogDescription className="text-sm">
            Choose a time slot for your appointment with {doctor.name}
          </DialogDescription>
        </DialogHeader>

        {/* Doctor info */}
        <div
          className={classNames(
            "flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 border-b pb-3 text-center sm:text-left"
          )}
        >
          <div className="h-12 w-12 sm:h-10 sm:w-10 flex-shrink-0 border border-gray-200 rounded-full overflow-hidden relative">
            <Image
              src={doctorImg}
              alt={doctor.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 48px, 40px"
              priority
            />
          </div>
          <div>
            <div
              className={classNames(
                "flex flex-col sm:flex-row items-center sm:items-start sm:gap-2"
              )}
              role="group"
              aria-label="Doctor specialty and location"
            >
              <Badge
                variant="secondary"
                className={classNames("text-xs mt-1 sm:mt-0")}
                aria-label={`Specialty: ${doctor.specialty}`}
              >
                {doctor.specialty}
              </Badge>
            </div>
            <div
              className={classNames(
                "flex items-center justify-center sm:justify-start text-gray-500 text-xs mt-1"
              )}
              role="group"
              aria-label="Doctor location"
            >
              <MapPin
                size={12}
                className={classNames("mr-1")}
                aria-hidden="true"
              />
              <span
                className="truncate max-w-[200px] sm:max-w-full"
                aria-describedby="doctor-location"
              >
                {doctor.location}
              </span>
            </div>
          </div>
        </div>

        {/* Time slots */}
        <div className={classNames("pt-2")}>
          {!!availableDates.length ? (
            <Tabs
              defaultValue={availableDates[0]}
              className={classNames("w-full")}
              aria-label="Available dates"
            >
              <TabsList className={classNames("mb-3 w-full")} role="tablist">
                {availableDates.map((date) => (
                  <TabsTrigger
                    key={date}
                    value={date}
                    className={classNames(
                      "flex-1 text-xs sm:text-sm py-1 sm:py-2"
                    )}
                    role="tab"
                    aria-label={`Select date: ${date}`}
                  >
                    {date.split(",")[0]}
                  </TabsTrigger>
                ))}
              </TabsList>
              {availableDates.map((date) => (
                <TabsContent
                  key={date}
                  value={date}
                  className={classNames("mt-0")}
                >
                  <ScrollArea
                    className={classNames("h-[180px] sm:h-[200px] pr-4")}
                  >
                    <RadioGroup
                      value={selectedSlot ?? undefined}
                      onValueChange={setSelectedSlot}
                    >
                      <div className={classNames("grid grid-cols-2 gap-2")}>
                        {groupedSlots[date]
                          .filter((slot) => slot.available)
                          .map((slot) => (
                            <div
                              key={slot.id}
                              className={classNames("relative")}
                            >
                              <RadioGroupItem
                                value={slot.id}
                                id={slot.id}
                                className={classNames(
                                  "peer sr-only",
                                  "focus:outline-2 focus:outline-blue-500"
                                )}
                                aria-label={`${formatDate(slot.date).dateTime}`}
                              />
                              <Label
                                htmlFor={slot.id}
                                className={classNames(
                                  "flex flex-col p-2 sm:p-3 border rounded-md cursor-pointer hover:bg-gray-50",
                                  "peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50",
                                  "peer-focus:outline-2 peer-focus:outline-blue-500"
                                )}
                              >
                                <div
                                  className={classNames(
                                    "flex items-center justify-center sm:justify-start"
                                  )}
                                >
                                  <Clock
                                    size={12}
                                    className={classNames("mr-1 text-gray-500")}
                                    aria-hidden="true"
                                  />
                                  <span
                                    className={classNames(
                                      "text-xs sm:text-sm font-medium"
                                    )}
                                  >
                                    {formatDate(slot.date).timeOnly}
                                  </span>
                                </div>
                              </Label>
                            </div>
                          ))}
                      </div>
                    </RadioGroup>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className={classNames("text-center py-6")}>
              <p className={classNames("text-gray-500 text-sm")}>
                No available time slots found
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto text-xs sm:text-sm py-1.5 sm:py-2 h-auto hover:cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmBooking}
            disabled={!selectedSlot || isLoading}
            className="w-full sm:w-auto text-xs sm:text-sm py-1.5 sm:py-2 h-auto hover:cursor-pointer"
          >
            {isLoading ? "Confirming..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
