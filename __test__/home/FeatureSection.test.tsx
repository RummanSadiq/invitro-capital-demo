import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock Lucide icons
jest.mock("lucide-react", () => ({
  User: jest.fn(({ className }) => (
    <div data-testid="user-icon" className={className} />
  )),
  CalendarDays: jest.fn(({ className }) => (
    <div data-testid="calendar-icon" className={className} />
  )),
  MapPin: jest.fn(({ className }) => (
    <div data-testid="map-icon" className={className} />
  )),
}));

// Import the component after mocking its dependencies
import { FeaturesSection } from "@/app/(home)/_components/FeaturesSection";

describe("FeaturesSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the section with correct styling", () => {
    render(<FeaturesSection />);
    const heading = screen.getByText("How It Works");
    const section = heading.closest("section");
    expect(section).toHaveClass("mb-16");
  });

  it("renders the correct heading", () => {
    render(<FeaturesSection />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("How It Works");
    expect(heading).toHaveClass("text-3xl");
    expect(heading).toHaveClass("font-bold");
    expect(heading).toHaveClass("text-center");
  });

  it("renders the grid container with correct classes", () => {
    render(<FeaturesSection />);
    // Find a card element and get its parent (the grid container)
    const cardElements = screen.getAllByText(
      /(Find a Doctor|Book Appointment|Visit Doctor)/,
    );
    const firstCard = cardElements[0].closest('[data-slot="card"]');
    const container = firstCard?.parentElement;

    expect(container).toHaveClass("grid");
    expect(container).toHaveClass("grid-cols-1");
    expect(container).toHaveClass("md:grid-cols-3");
    expect(container).toHaveClass("gap-8");
  });

  it("renders exactly 3 feature cards", () => {
    render(<FeaturesSection />);
    const cardElements = screen.getAllByText(
      /(Find a Doctor|Book Appointment|Visit Doctor)/,
    );
    const cards = cardElements.map((el) => el.closest('[data-slot="card"]'));

    // Filter out duplicates in case multiple elements match within same card
    const uniqueCards = [...new Set(cards)];
    expect(uniqueCards).toHaveLength(3);
  });

  it("renders all feature cards with proper structure", () => {
    render(<FeaturesSection />);

    // Find all cards by a common class that appears in the error output
    const cards = screen
      .getAllByText(/(Find a Doctor|Book Appointment|Visit Doctor)/)
      .map((el) => el.closest('[data-slot="card"]'));

    // Filter out duplicates
    const uniqueCards = [...new Set(cards)];

    uniqueCards.forEach((card) => {
      expect(card).toHaveClass("bg-card");
      expect(card).toHaveClass("text-card-foreground");
      expect(card).toHaveClass("flex");
      expect(card).toHaveClass("flex-col");
      expect(card).toHaveClass("rounded-xl");
      expect(card).toHaveClass("shadow-sm");
      expect(card).toHaveClass("text-center");
    });
  });

  it('renders the "Find a Doctor" feature with correct content', () => {
    render(<FeaturesSection />);

    // Title
    const findDoctorTitle = screen.getByText("Find a Doctor");
    expect(findDoctorTitle).toBeInTheDocument();
    expect(findDoctorTitle.closest('[data-slot="card-title"]')).toHaveClass(
      "font-semibold",
    );

    // Description
    const description = screen.getByText(
      "Browse through our extensive list of qualified doctors and specialists in your area.",
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass("text-gray-600");

    // Icon
    const userIcon = screen.getByTestId("user-icon");
    expect(userIcon).toBeInTheDocument();
    expect(userIcon).toHaveClass("size-8");
    expect(userIcon).toHaveClass("text-black");
  });

  it('renders the "Book Appointment" feature with correct content', () => {
    render(<FeaturesSection />);

    // Title
    const bookAppointmentTitle = screen.getByText("Book Appointment");
    expect(bookAppointmentTitle).toBeInTheDocument();

    // Description
    const description = screen.getByText(
      "Select a convenient time slot from the doctor's available schedule.",
    );
    expect(description).toBeInTheDocument();

    // Icon
    const calendarIcon = screen.getByTestId("calendar-icon");
    expect(calendarIcon).toBeInTheDocument();
    expect(calendarIcon).toHaveClass("size-8");
    expect(calendarIcon).toHaveClass("text-black");
  });

  it('renders the "Visit Doctor" feature with correct content', () => {
    render(<FeaturesSection />);

    // Title
    const visitDoctorTitle = screen.getByText("Visit Doctor");
    expect(visitDoctorTitle).toBeInTheDocument();

    // Description
    const description = screen.getByText(
      "Get directions to the doctor's office and receive appointment reminders.",
    );
    expect(description).toBeInTheDocument();

    // Icon
    const mapIcon = screen.getByTestId("map-icon");
    expect(mapIcon).toBeInTheDocument();
    expect(mapIcon).toHaveClass("size-8");
    expect(mapIcon).toHaveClass("text-black");
  });
});
