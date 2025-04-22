"use client";

import {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
  useEffect,
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
    [onFilterChange, specialtyFilter, availabilityFilter],
  );

  // Mobile filter handlers
  const handleTempFilterChange = useCallback(
    (key: keyof FilterState, value: string) => {
      setTempFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
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
    [specialtyFilter, availabilityFilter],
  );

  // Calculate active filter count for mobile badge
  const activeFilterCount = useMemo(
    () =>
      (specialtyFilter !== "All" ? 1 : 0) +
      (availabilityFilter !== "All" ? 1 : 0),
    [specialtyFilter, availabilityFilter],
  );

  return (
    <div className="mb-8">
      {/* Desktop Filter */}
      <div className="hidden lg:flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <span className="font-medium text-sm text-gray-600">Specialty:</span>
          <Select
            value={specialtyFilter}
            onValueChange={(value) =>
              handleDesktopFilterChange("specialty", value)
            }
          >
            <SelectTrigger className="w-[180px]">
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
          <span className="font-medium text-sm text-gray-600">
            Available on:
          </span>
          <Select
            value={availabilityFilter}
            onValueChange={(value) =>
              handleDesktopFilterChange("availability", value)
            }
          >
            <SelectTrigger className="w-[180px]">
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
          >
            <X className="h-4 w-4 mr-1" />
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
            >
              <Filter size={16} />
              <span>Filter Doctors</span>
              {hasActiveFilters && (
                <span className="ml-1 bg-primary/20 text-primary text-xs py-0.5 px-1.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70vh]">
            <SheetHeader>
              <SheetTitle>Filter Doctors</SheetTitle>
              <SheetDescription>
                Refine your search results by specialty and availability
              </SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6 px-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Specialty</label>
                <Select
                  value={tempFilters.specialty}
                  onValueChange={(value) =>
                    handleTempFilterChange("specialty", value)
                  }
                >
                  <SelectTrigger className="w-full">
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
                <label className="text-sm font-medium">Available on</label>
                <Select
                  value={tempFilters.availability}
                  onValueChange={(value) =>
                    handleTempFilterChange("availability", value)
                  }
                >
                  <SelectTrigger className="w-full">
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
            <SheetFooter className="flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full sm:w-auto"
              >
                Clear all
              </Button>
              <Button className="w-full sm:w-auto" onClick={applyFilters}>
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
