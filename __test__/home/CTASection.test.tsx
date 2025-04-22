import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CTASection } from "@/app/(home)/_components/CTASection";
import { ROUTES } from "@/utils/route";

// Mock the next/link component
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return (
      <a href={href} data-testid="mock-link">
        {children}
      </a>
    );
  };

  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("CTASection", () => {
  beforeEach(() => {
    render(<CTASection />);
  });

  it("renders the section with correct styling", () => {
    const section = screen
      .getByText("Ready to Book Your Appointment?")
      .closest("section");
    expect(section).toHaveClass("bg-black");
    expect(section).toHaveClass("text-white");
    expect(section).toHaveClass("rounded-lg");
  });

  it("renders the heading text correctly", () => {
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Ready to Book Your Appointment?");
    expect(heading).toHaveClass("font-bold");
  });

  it("renders the description paragraph", () => {
    const description = screen.getByText(
      "Join thousands of patients who have simplified their healthcare journey with our booking platform.",
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass("text-lg");
  });

  it('renders the "Find a Doctor" button with correct link', () => {
    const findDoctorButton = screen.getByRole("link", {
      name: /find a doctor/i,
    });
    expect(findDoctorButton).toHaveAttribute("href", ROUTES.doctor);
  });

  it('renders the "My Appointments" button with correct link', () => {
    const appointmentsButton = screen.getByRole("link", {
      name: /my appointments/i,
    });
    expect(appointmentsButton).toHaveAttribute("href", ROUTES.appointment);
  });

  it("renders buttons with the secondary variant", () => {
    // There are multiple buttons
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);

    // Check each button has the secondary class
    buttons.forEach((button) => {
      expect(button).toHaveClass("bg-secondary");
    });
  });

  it("checks for large size styling", () => {
    // Get all buttons
    const buttons = screen.getAllByRole("button");

    // Check size-related classes
    buttons.forEach((button) => {
      expect(button).toHaveClass("h-10");
      expect(button).toHaveClass("px-6");
    });
  });

  it("renders a responsive button layout with flex classes", () => {
    const buttonContainer = screen.getByRole("group", {
      name: /call to action buttons/i,
    });
    expect(buttonContainer).toHaveClass("flex");
    expect(buttonContainer).toHaveClass("flex-col");
    expect(buttonContainer).toHaveClass("sm:flex-row");
  });

  it("has appropriate accessibility attributes", () => {
    const section = screen.getByRole("complementary");
    expect(section).toHaveAttribute("aria-labelledby", "cta-heading");

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveAttribute("id", "cta-heading");

    const description = screen.getByText(/Join thousands of patients/);
    expect(description).toHaveAttribute("id", "cta-description");

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("aria-describedby", "cta-description");
    });
  });
});
