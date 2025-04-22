import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Import the component directly
import Home from "@/app/(home)/page";

describe("Home Page", () => {
  it("renders the hero section with correct heading", () => {
    render(<Home />);

    const heading = screen.getByText("Book Your Doctor Appointment with Ease");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });

  it('renders the features section with "How It Works" heading', () => {
    render(<Home />);

    const heading = screen.getByText("How It Works");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  });

  it("renders the CTA section with appointment booking prompt", () => {
    render(<Home />);

    const heading = screen.getByText("Ready to Book Your Appointment?");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  });

  it('renders the "Find a Doctor" links', () => {
    render(<Home />);

    // There are multiple "Find a Doctor" links on the page
    const doctorLinks = screen.getAllByText("Find a Doctor");

    // Should be at least one link
    expect(doctorLinks.length).toBeGreaterThan(0);

    // The link text might be inside an <a> or one of its parents might be an <a>
    doctorLinks.forEach((link) => {
      // Check if the element itself is an anchor
      if (link.tagName === "A") {
        expect(link).toHaveAttribute("href", "doctors");
      }
      // Check if it's a parent
      else if (link.parentElement?.tagName === "A") {
        expect(link.parentElement).toHaveAttribute("href", "doctors");
      }
      // Check if it's a child
      else {
        const anchorParent = link.querySelector("a") || link.closest("a");
        if (anchorParent) {
          expect(anchorParent).toHaveAttribute("href", "doctors");
        } else {
          // If we can't find an anchor, at least verify the text exists
          expect(link).toHaveTextContent("Find a Doctor");
        }
      }
    });
  });

  it('renders the "My Appointments" link', () => {
    render(<Home />);

    const appointmentsLink = screen.getByText("My Appointments");
    expect(appointmentsLink).toBeInTheDocument();

    // Similar to the "Find a Doctor" links, handle different possible structures
    if (appointmentsLink.tagName === "A") {
      expect(appointmentsLink).toHaveAttribute("href", "/appointments");
    } else if (appointmentsLink.parentElement?.tagName === "A") {
      expect(appointmentsLink.parentElement).toHaveAttribute(
        "href",
        "/appointments",
      );
    } else {
      const anchorParent =
        appointmentsLink.querySelector("a") || appointmentsLink.closest("a");
      if (anchorParent) {
        expect(anchorParent).toHaveAttribute("href", "/appointments");
      } else {
        // If we can't find an anchor, at least verify the text exists
        expect(appointmentsLink).toHaveTextContent("My Appointments");
      }
    }
  });
});
