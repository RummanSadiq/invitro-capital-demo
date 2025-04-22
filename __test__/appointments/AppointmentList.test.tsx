import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Import the component with the correct name
import { AppointmentCard } from "@/app/appointments/_components/AppointmentList";

// Mock the Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, className, priority, sizes }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      data-priority={priority ? "true" : "false"}
      data-sizes={sizes}
      data-testid="mock-image"
    />
  ),
}));

// Mock the formatDate function
jest.mock(
  "@/lib/utils",
  () => ({
    formatDate: jest.fn().mockImplementation(() => ({
      dateOnly: "Apr 23, 2025",
      timeOnly: "10:00 AM",
    })),
  }),
  { virtual: true },
);

// Mock the Lucide icons
jest.mock(
  "lucide-react",
  () => ({
    Calendar: ({ className, "aria-hidden": ariaHidden }) => (
      <svg
        data-testid="calendar-icon"
        className={className}
        aria-hidden={ariaHidden}
      />
    ),
    Clock: ({ className, "aria-hidden": ariaHidden }) => (
      <svg
        data-testid="clock-icon"
        className={className}
        aria-hidden={ariaHidden}
      />
    ),
    MapPin: ({ className, "aria-hidden": ariaHidden }) => (
      <svg
        data-testid="map-icon"
        className={className}
        aria-hidden={ariaHidden}
      />
    ),
  }),
  { virtual: true },
);

// Mock appointment data
const mockAppointment = {
  id: "appt-123",
  timeSlot: {
    id: "ts-123",
    date: new Date("2025-04-23T10:00:00"),
    available: false,
  },
  doctor: {
    id: "doc-123",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    location: "123 Medical Center, New York, NY",
  },
  patient: {
    id: "pat-123",
    name: "John Doe",
  },
  status: "upcoming",
};

describe("AppointmentCard", () => {
  beforeEach(() => {
    render(<AppointmentCard appointment={mockAppointment} />);
  });

  it("renders a card with correct accessibility attributes", () => {
    const card = screen.getByRole("region");
    expect(card).toHaveAttribute("role", "region");
    expect(card).toHaveAttribute(
      "aria-labelledby",
      `appointment-title-${mockAppointment.id}`,
    );
    expect(card).toHaveClass("overflow-hidden");
  });

  it("renders the doctor name and specialty", () => {
    const doctorName = screen.getByText(mockAppointment.doctor.name);
    expect(doctorName).toBeInTheDocument();
    expect(doctorName.closest('[data-slot="card-title"]')).toHaveAttribute(
      "id",
      `appointment-title-${mockAppointment.id}`,
    );

    const specialty = screen.getByText(mockAppointment.doctor.specialty);
    expect(specialty).toBeInTheDocument();
    expect(specialty.closest('[data-slot="card-description"]')).toHaveClass(
      "text-muted-foreground",
    );
  });

  it("renders the doctor profile image", () => {
    const image = screen.getByTestId("mock-image");
    expect(image).toHaveAttribute(
      "alt",
      `Profile picture of Dr. ${mockAppointment.doctor.name}`,
    );
    expect(image).toHaveAttribute("data-priority", "true");
    expect(image).toHaveClass("object-cover");
  });

  it("displays the appointment status badge", () => {
    const badge = screen.getByRole("status");
    expect(badge).toHaveTextContent("Upcoming");
    expect(badge).toHaveAttribute("aria-label", "Appointment Status: Upcoming");
    expect(badge).toHaveClass("bg-green-50");
    expect(badge).toHaveClass("text-green-700");
  });

  it("renders appointment details with date, time, and location", () => {
    // Appointment details container
    const cardContent = screen.getByLabelText("Appointment Details");
    expect(cardContent).toBeInTheDocument();
    expect(cardContent).toHaveAttribute("data-slot", "card-content");

    // Check for date
    const calendarIcon = screen.getByTestId("calendar-icon");
    expect(calendarIcon).toBeInTheDocument();
    expect(screen.getByText("Apr 23, 2025")).toBeInTheDocument();

    // Check for time
    const clockIcon = screen.getByTestId("clock-icon");
    expect(clockIcon).toBeInTheDocument();
    expect(screen.getByText("10:00 AM")).toBeInTheDocument();

    // Check for location
    const mapIcon = screen.getByTestId("map-icon");
    expect(mapIcon).toBeInTheDocument();
    expect(
      screen.getByText(mockAppointment.doctor.location),
    ).toBeInTheDocument();
  });

  it("renders details list with proper accessibility roles", () => {
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3); // Date, time, and location

    // Each list item should have an icon and text
    listItems.forEach((item) => {
      expect(item).toHaveClass("flex");
      expect(item).toHaveClass("justify-start");
      expect(item).toHaveClass("items-center");
    });
  });
});
