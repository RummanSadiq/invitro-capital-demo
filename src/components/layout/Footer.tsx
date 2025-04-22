import Link from "next/link";
import { FunctionComponent } from "react";
import { ROUTES } from "@/utils/route";

const quickLinks = [
  { label: "Home", href: ROUTES.home },
  { label: "Find Doctors", href: ROUTES.doctor },
  { label: "My Appointments", href: ROUTES.appointment },
];

export const Footer: FunctionComponent = () => {
  return (
    <footer
      className="bg-white text-black py-8"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First Column - HealthConnect */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold mb-4">HealthConnect</h2>
            <p
              className="text-black max-w-xs mx-auto md:mx-0"
              aria-label="Company Description"
            >
              Making healthcare accessible and convenient for everyone.
            </p>
          </div>

          {/* Second Column - Quick Links */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <nav aria-label="Quick Navigation">
              <ul className="space-y-2" role="list">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm px-1"
                      aria-label={`Navigate to ${link.label}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Third Column - Contact */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <address
              className="text-black not-italic"
              aria-label="Company Contact Information"
            >
              <p>123 Healthcare Avenue</p>
              <p>Medical District, MD 12345</p>
              <p className="mt-2">support@healthconnect.example</p>
              <p>(123) 456-7890</p>
            </address>
          </div>
        </div>

        {/* Copyright Section */}
        <div
          className="border-t border-gray-200 mt-8 pt-6 text-center text-black"
          role="region"
          aria-label="Copyright Information"
        >
          <p>
            &copy; {new Date().getFullYear()} HealthConnect. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
