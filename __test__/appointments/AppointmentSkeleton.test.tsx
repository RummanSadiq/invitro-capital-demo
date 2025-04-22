import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Import the component
// Adjust this path to match your project structure
import { AppointmentSkeleton } from "@/app/appointments/_components/AppointmenSkeleton";

describe("AppointmentSkeleton", () => {
  it("renders a grid container with correct classes", () => {
    const { container } = render(<AppointmentSkeleton />);
    const gridElement = container.firstChild;

    expect(gridElement).toBeInTheDocument();
    expect(gridElement).toHaveClass("grid");
    expect(gridElement).toHaveClass("gap-4");
    expect(gridElement).toHaveClass("md:grid-cols-2");
  });

  it("renders exactly 2 skeleton cards", () => {
    const { container } = render(<AppointmentSkeleton />);
    const cards = container.querySelectorAll('[data-slot="card"]');

    expect(cards).toHaveLength(2);
    cards.forEach((card) => {
      expect(card).toHaveClass("overflow-hidden");
    });
  });

  it("renders card headers with proper structure", () => {
    const { container } = render(<AppointmentSkeleton />);
    const headers = container.querySelectorAll('[data-slot="card-header"]');

    expect(headers).toHaveLength(2);
    headers.forEach((header) => {
      expect(header).toHaveClass("pb-2");
    });
  });

  it("renders flex containers in the card headers", () => {
    const { container } = render(<AppointmentSkeleton />);

    // Find all flex containers in headers
    const headerFlexContainers = container.querySelectorAll(
      '[data-slot="card-header"] > div',
    );
    expect(headerFlexContainers.length).toBeGreaterThan(0);

    headerFlexContainers.forEach((flexContainer) => {
      expect(flexContainer).toHaveClass("flex");
      expect(flexContainer).toHaveClass("justify-between");
    });
  });

  it("renders card content with skeleton lines", () => {
    const { container } = render(<AppointmentSkeleton />);
    const contents = container.querySelectorAll('[data-slot="card-content"]');

    expect(contents).toHaveLength(2);
    contents.forEach((content) => {
      expect(content).toHaveClass("pb-2");

      // Find the space-y container
      const spaceYContainer = content.querySelector("div");
      expect(spaceYContainer).toHaveClass("space-y-2");
    });
  });

  it("renders card footer with a full-width skeleton", () => {
    const { container } = render(<AppointmentSkeleton />);
    const footers = container.querySelectorAll('[data-slot="card-footer"]');

    expect(footers).toHaveLength(2);

    // Each footer should have a skeleton
    footers.forEach((footer) => {
      const skeleton = footer.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass("h-9");
      expect(skeleton).toHaveClass("w-full");
    });
  });

  it("renders skeletons with appropriate sizing classes", () => {
    const { container } = render(<AppointmentSkeleton />);
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');

    // Should have multiple skeletons
    expect(skeletons.length).toBeGreaterThan(5);

    // Check for specific skeleton types
    const avatarSkeleton = Array.from(skeletons).find((skeleton) =>
      skeleton.className.includes("rounded-full"),
    );
    expect(avatarSkeleton).toBeInTheDocument();
    expect(avatarSkeleton).toHaveClass("h-10");
    expect(avatarSkeleton).toHaveClass("w-10");

    // Check for full-width skeletons
    const fullWidthSkeletons = Array.from(skeletons).filter((skeleton) =>
      skeleton.className.includes("w-full"),
    );
    expect(fullWidthSkeletons.length).toBeGreaterThan(0);

    // Check for partial-width skeletons
    const partialWidthSkeletons = Array.from(skeletons).filter(
      (skeleton) =>
        skeleton.className.includes("w-3/4") ||
        skeleton.className.includes("w-32") ||
        skeleton.className.includes("w-20"),
    );
    expect(partialWidthSkeletons.length).toBeGreaterThan(0);
  });

  it("renders skeletons with animation class", () => {
    const { container } = render(<AppointmentSkeleton />);
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');

    skeletons.forEach((skeleton) => {
      expect(skeleton).toHaveClass("animate-pulse");
      expect(skeleton).toHaveClass("bg-accent");
    });
  });
});
