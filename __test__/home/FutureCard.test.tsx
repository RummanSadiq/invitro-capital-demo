import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Import the component directly since mocking doesn't seem to be working
import { FeatureCard } from "@/app/(home)/_components/FutureCard";

describe("FeatureCard", () => {
  const mockProps = {
    icon: <svg data-testid="test-icon" />,
    title: "Test Feature",
    description: "This is a test description",
  };

  it("renders with the correct structure", () => {
    render(<FeatureCard {...mockProps} />);

    // Check for the card elements using data-slot attributes from the actual DOM
    const card = screen.getByText("Test Feature").closest('[data-slot="card"]');
    const cardHeader = screen
      .getByText("Test Feature")
      .closest('[data-slot="card-header"]');
    const cardTitle = screen
      .getByText("Test Feature")
      .closest('[data-slot="card-title"]');
    const cardContent = screen
      .getByText("This is a test description")
      .closest('[data-slot="card-content"]');

    expect(card).toBeInTheDocument();
    expect(cardHeader).toBeInTheDocument();
    expect(cardTitle).toBeInTheDocument();
    expect(cardContent).toBeInTheDocument();
  });

  it("applies center text alignment to the card", () => {
    render(<FeatureCard {...mockProps} />);
    const card = screen.getByText("Test Feature").closest('[data-slot="card"]');
    expect(card).toHaveClass("text-center");
  });

  it("renders the icon within a circular container", () => {
    render(<FeatureCard {...mockProps} />);

    // Find the icon container
    const iconContainer = screen.getByTestId("test-icon").closest("div");

    // Check container styling
    expect(iconContainer).toHaveClass("w-16");
    expect(iconContainer).toHaveClass("h-16");
    expect(iconContainer).toHaveClass("bg-gray-100");
    expect(iconContainer).toHaveClass("rounded-full");
    expect(iconContainer).toHaveClass("flex");
    expect(iconContainer).toHaveClass("items-center");
    expect(iconContainer).toHaveClass("justify-center");
    expect(iconContainer).toHaveClass("mx-auto");
    expect(iconContainer).toHaveClass("mb-4");
  });

  it("renders the title with correct styling", () => {
    render(<FeatureCard {...mockProps} />);

    const titleElement = screen.getByText("Test Feature");
    const titleContainer = titleElement.closest('[data-slot="card-title"]');

    expect(titleContainer).toHaveClass("font-semibold");
    expect(titleContainer).toHaveClass("text-xl");
  });

  it("renders the description with gray text color", () => {
    render(<FeatureCard {...mockProps} />);

    const description = screen.getByText("This is a test description");
    expect(description).toHaveClass("text-gray-600");
  });

  it("renders different icon, title and description when provided", () => {
    const customProps = {
      icon: <div data-testid="custom-icon">🔧</div>,
      title: "Custom Feature",
      description: "This is a custom description",
    };

    render(<FeatureCard {...customProps} />);

    // Check for custom content
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(screen.getByText("Custom Feature")).toBeInTheDocument();
    expect(
      screen.getByText("This is a custom description"),
    ).toBeInTheDocument();
  });
});
