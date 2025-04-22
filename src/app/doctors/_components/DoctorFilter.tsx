"use client";

import {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useId,
} from "react";
import { Filter, X } from "lucide-react";
import { availabilityOptions, specialties } from "@/lib/constants";
import { AvailabilityDay, Specialties } from "@/types/doctors";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type FilterState = {
  specialty: string;
  availability: AvailabilityDay;
};

type Props = {
  specialtyFilter: string;
  availabilityFilter: AvailabilityDay;
  onFilterChange: (specialty: string, availability: AvailabilityDay) => void;
};

export const DoctorFilter: FunctionComponent<Props> = ({
  specialtyFilter,
  availabilityFilter,
  onFilterChange,
}) => {
  // Combined filter state for mobile sheet
  const [tempFilters, setTempFilters] = useState<FilterState>({
    specialty: specialtyFilter,
    availability: availabilityFilter,
  });
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const specialtyLabelId = useId();
  const availabilityLabelId = useId();
  const filterSectionId = useId();

  // Sync temp filters when parent state changes
  useEffect(() => {
    setTempFilters({
      specialty: specialtyFilter,
      availability: availabilityFilter,
    });
  }, [specialtyFilter, availabilityFilter]);

  // Desktop filter handlers
  const handleDesktopFilterChange = useCallback(
    (key: keyof FilterState, value: string) => {
      if (key === "specialty") {
        onFilterChange(value, availabilityFilter);
      } else {
        onFilterChange(specialtyFilter, value as AvailabilityDay);
      }
    },
    [onFilterChange, specialtyFilter, availabilityFilter]
  );

  // Mobile filter handlers
  const handleTempFilterChange = useCallback(
    (key: keyof FilterState, value: string) => {
      setTempFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const applyFilters = useCallback(() => {
    onFilterChange(tempFilters.specialty, tempFilters.availability);
    setIsSheetOpen(false);
  }, [onFilterChange, tempFilters]);

  const clearFilters = useCallback(() => {
    const newFilters = {
      specialty: Specialties.All,
      availability: AvailabilityDay.All,
    };

    // Update both local and parent state
    setTempFilters(newFilters);
    onFilterChange(newFilters.specialty, newFilters.availability);
  }, [onFilterChange]);

  // Determine if any filters are active
  const hasActiveFilters = useMemo(
    () =>
      specialtyFilter !== Specialties.All ||
      availabilityFilter !== AvailabilityDay.All,
    [specialtyFilter, availabilityFilter]
  );

  // Calculate active filter count for mobile badge
  const activeFilterCount = useMemo(
    () =>
      (specialtyFilter !== "All" ? 1 : 0) +
      (availabilityFilter !== "All" ? 1 : 0),
    [specialtyFilter, availabilityFilter]
  );

  return (
    <div
      className="mb-8"
      role="region"
      aria-label="Doctor Search Filters"
      id={filterSectionId}
    >
      {/* Desktop Filter */}
      <div
        className="hidden lg:flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
        role="toolbar"
        aria-label="Desktop Doctor Filters"
      >
        <div className="flex items-center gap-3">
          <label
            htmlFor={`specialty-select-${specialtyLabelId}`}
            className="font-medium text-sm text-gray-600"
            id={specialtyLabelId}
          >
            Specialty:
          </label>
          <Select
            value={specialtyFilter}
            onValueChange={(value) =>
              handleDesktopFilterChange("specialty", value)
            }
          >
            <SelectTrigger
              className="w-[180px]"
              id={`specialty-select-${specialtyLabelId}`}
              aria-labelledby={specialtyLabelId}
            >
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Specialties</SelectLabel>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor={`availability-select-${availabilityLabelId}`}
            className="font-medium text-sm text-gray-600"
            id={availabilityLabelId}
          >
            Available on:
          </label>
          <Select
            value={availabilityFilter}
            onValueChange={(value) =>
              handleDesktopFilterChange("availability", value)
            }
          >
            <SelectTrigger
              className="w-[180px]"
              id={`availability-select-${availabilityLabelId}`}
              aria-labelledby={availabilityLabelId}
            >
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Days</SelectLabel>
                {availabilityOptions.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="ml-auto text-sm"
            size="sm"
            aria-label="Clear all filters"
          >
            <X className="h-4 w-4 mr-1" aria-hidden="true" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Mobile Filter */}
      <div className="lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full justify-center"
              aria-label="Open Doctor Filters"
            >
              <Filter size={16} aria-hidden="true" />
              <span>Filter Doctors</span>
              {hasActiveFilters && (
                <span
                  className="ml-1 bg-primary/20 text-primary text-xs py-0.5 px-1.5 rounded-full"
                  aria-label={`${activeFilterCount} active filters`}
                >
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-[70vh]"
            aria-label="Mobile Doctor Filters"
          >
            <SheetHeader>
              <SheetTitle>Filter Doctors</SheetTitle>
              <SheetDescription>
                Refine your search results by specialty and availability
              </SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6 px-4">
              <div className="space-y-2">
                <label
                  htmlFor={`mobile-specialty-select-${specialtyLabelId}`}
                  className="text-sm font-medium block"
                >
                  Specialty
                </label>
                <Select
                  value={tempFilters.specialty}
                  onValueChange={(value) =>
                    handleTempFilterChange("specialty", value)
                  }
                >
                  <SelectTrigger
                    className="w-full"
                    id={`mobile-specialty-select-${specialtyLabelId}`}
                  >
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`mobile-availability-select-${availabilityLabelId}`}
                  className="text-sm font-medium block"
                >
                  Available on
                </label>
                <Select
                  value={tempFilters.availability}
                  onValueChange={(value) =>
                    handleTempFilterChange("availability", value)
                  }
                >
                  <SelectTrigger
                    className="w-full"
                    id={`mobile-availability-select-${availabilityLabelId}`}
                  >
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {availabilityOptions.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <SheetFooter
              className="flex-col sm:flex-row gap-3"
              role="group"
              aria-label="Filter Actions"
            >
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full sm:w-auto"
                aria-label="Clear all filters"
              >
                Clear all
              </Button>
              <Button
                className="w-full sm:w-auto"
                onClick={applyFilters}
                aria-label="Apply selected filters"
              >
                Apply Filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default DoctorFilter;
