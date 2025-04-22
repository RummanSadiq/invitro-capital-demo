import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock UI components
jest.mock(
  "@/components/ui/card",
  () => ({
    Card: ({ children, role, "aria-labelledby": ariaLabelledby }) => (
      <div role={role} aria-labelledby={ariaLabelledby} data-testid="card">
        {children}
      </div>
    ),
    CardContent: ({ children, className }) => (
      <div className={className} data-testid="card-content">
        {children}
      </div>
    ),
  }),
  { virtual: true },
);

jest.mock(
  "@/components/ui/button",
  () => ({
    Button: ({ children, "aria-label": ariaLabel }) => (
      <button aria-label={ariaLabel} data-testid="button">
        {children}
      </button>
    ),
  }),
  { virtual: true },
);

jest.mock(
  "lucide-react",
  () => ({
    AlertCircle: ({ className, "aria-hidden": ariaHidden }) => (
      <svg
        className={className}
        aria-hidden={ariaHidden}
        data-testid="alert-circle-icon"
      />
    ),
  }),
  { virtual: true },
);

// Import the component after mocking dependencies
const { AppointmentEmptyState } = require("@/components/AppointmentEmptyState");

describe("AppointmentEmptyState", () => {
  beforeEach(() => {
    render(<AppointmentEmptyState />);
  });

  it("renders a card with correct accessibility attributes", () => {
    const card = screen.getByTestId("card");
    expect(card).toHaveAttribute("role", "region");
    expect(card).toHaveAttribute("aria-labelledby", "empty-state-title");
  });

  it("renders card content with centered layout", () => {
    const cardContent = screen.getByTestId("card-content");
    expect(cardContent).toHaveClass("flex");
    expect(cardContent).toHaveClass("flex-col");
    expect(cardContent).toHaveClass("items-center");
    expect(cardContent).toHaveClass("justify-center");
    expect(cardContent).toHaveClass("text-center");
  });

  it("renders an alert icon with correct styling", () => {
    const icon = screen.getByTestId("alert-circle-icon");
    expect(icon).toHaveClass("h-6");
    expect(icon).toHaveClass("w-6");
    expect(icon).toHaveClass("text-gray-500");
    expect(icon).toHaveAttribute("aria-hidden", "true");

    // Check icon container
    const iconContainer = icon.closest("div");
    expect(iconContainer).toHaveClass("rounded-full");
    expect(iconContainer).toHaveClass("bg-gray-100");
    expect(iconContainer).toHaveClass("p-3");
    expect(iconContainer).toHaveClass("mb-4");
    expect(iconContainer).toHaveAttribute("aria-hidden", "true");
  });

  it("renders the correct heading with accessibility ID", () => {
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("No Upcoming Appointments");
    expect(heading).toHaveAttribute("id", "empty-state-title");
    expect(heading).toHaveClass("text-lg");
    expect(heading).toHaveClass("font-medium");
    expect(heading).toHaveClass("text-gray-900");
    expect(heading).toHaveClass("mb-1");
  });

  it("renders the description text with proper styling", () => {
    const paragraph = screen.getByText(
      /You don't have any upcoming appointments/,
    );
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass("text-gray-500");
    expect(paragraph).toHaveClass("mb-4");
    expect(paragraph).toHaveClass("max-w-md");
    expect(paragraph).toHaveAttribute("aria-describedby", "empty-state-title");
  });

  it("renders a button with appropriate accessibility attributes", () => {
    const button = screen.getByTestId("button");
    expect(button).toHaveAttribute(
      "aria-label",
      "Navigate to doctor booking page",
    );
  });

  it("renders a link to the doctors page", () => {
    const link = screen.getByText("Book an Appointment");
    expect(link).toBeInTheDocument();

    const anchor = link.closest("a");
    expect(anchor).toHaveAttribute("href", "/doctors");
    expect(anchor).toHaveAttribute("aria-label", "Book an Appointment");
  });
});
