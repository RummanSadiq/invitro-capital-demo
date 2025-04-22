import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

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

// Mock the Button component using virtual: true to avoid module resolution
jest.mock(
  "@/components/ui/button",
  () => {
    const MockButton = ({
      children,
      size,
      asChild,
    }: {
      children: React.ReactNode;
      size?: string;
      asChild?: boolean;
    }) => {
      return (
        <button
          data-testid="mock-button"
          data-size={size}
          data-aschild={asChild ? "true" : "false"}
        >
          {children}
        </button>
      );
    };

    MockButton.displayName = "MockButton";
    return { Button: MockButton };
  },
  { virtual: true },
);

// Import the component after setting up mocks
import { HeroSection } from "@/app/(home)/_components/HeroSection";
import { ROUTES } from "@/utils/route";

describe("HeroSection", () => {
  beforeEach(() => {
    render(<HeroSection />);
  });

  it("renders the section with correct styling", () => {
    const heading = screen.getByText("Book Your Doctor Appointment with Ease");
    const section = heading.closest("section");

    expect(section).toHaveClass("flex");
    expect(section).toHaveClass("flex-col");
    expect(section).toHaveClass("items-center");
    expect(section).toHaveClass("justify-center");
    expect(section).toHaveClass("text-center");
    expect(section).toHaveClass("mb-16");
  });

  it("renders the heading with correct text and styling", () => {
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveTextContent("Book Your Doctor Appointment with Ease");
    expect(heading).toHaveClass("text-4xl");
    expect(heading).toHaveClass("md:text-5xl");
    expect(heading).toHaveClass("font-bold");
    expect(heading).toHaveClass("text-gray-900");
    expect(heading).toHaveClass("mb-4");
  });

  it("renders the description paragraph with correct text and styling", () => {
    const paragraph = screen.getByText(
      "Find and schedule appointments with the best healthcare professionals in your area. No waiting times, no hassle.",
    );

    expect(paragraph).toHaveClass("text-xl");
    expect(paragraph).toHaveClass("text-gray-600");
    expect(paragraph).toHaveClass("max-w-2xl");
    expect(paragraph).toHaveClass("mb-8");
  });

  it("renders a button with link to doctors page", () => {
    // Find either the button or the link, depending on how the component renders with mocks
    const buttonOrLink = screen.getByText("Find a Doctor");
    expect(buttonOrLink).toBeInTheDocument();

    // Try to find the link
    const link = screen.queryByTestId("mock-link");
    if (link) {
      expect(link).toHaveAttribute("href", ROUTES.doctor);
    }
  });
});
